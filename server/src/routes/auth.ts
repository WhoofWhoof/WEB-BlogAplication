import * as express from "express";
import { User } from "../models/user/user";
import { isNil, isUndefined, trim } from "lodash";
import { compare, genSalt, hash } from "bcrypt";
import { generateToken, hashValue } from "../util/util";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    req.body.email = trim(req.body.email);
    const user =
      await new User().where({ email: req.body.email }).fetch({require: false});
    if (isNil(user)) {
      res.json({
        success: false,
        message: "Combinatia de utilizator si parola nu exista!" +
          "Va rugam sa reincercati!"
      });
    } else {
      if (req.body.password.length > 1 &&
        await compare(req.body.password, user.get("password"))) {
        const token = generateToken(user);
        res.json({
          success: true,
          message: "Bun venit!",
          token: token,
          userData: {
            id: user.get("id"),
            email: user.get("email"),
            type: user.get("type"),
          }
        });
      } else {
        res.json({
          success: false,
          message: "Combinatia de utilizator si parola nu exista!" +
            "Va rugam sa reincercati!"
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

router.post("/sign-up", async (req, res, next) => {
  try {
    let user = new User();
    const email = trim(req.body.email);
    user.where({email: email})
    .count("email")
    .then(async (val: any) => {
      const createUser = async (alreadyActive = false,
                                userData: User | undefined = undefined) => {
        if (isUndefined(userData)) {
          user = new User({
            email: email,
            password: await hashValue(req.body.password),
          });
        } else {
          user = userData;
          user.set({
            password: await hashValue(req.body.password),
          });
        }

        user.save();
      };

      if (val) {
        new User()
        .where({"email": email})
        .fetch()
        .then(async userData => {
          if (userData) {
            res.json({
              success: false,
              message: "Adresa de email este deja inregistrata!"
            });
          } else {
            await createUser(true, userData);
            res.json({
              success: true,
              message: "Contul a fost creat cu succes!" +
                "Va rugam sa va logati!"
            });
          }
        }
          );
      } else if (!val) {
        await createUser();
        res.json({
          success: true,
          message: "Contul a fost creat cu succes!" +
            "Va rugam sa va logati!"
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;
