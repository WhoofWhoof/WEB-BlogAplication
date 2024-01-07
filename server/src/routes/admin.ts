import { Router } from "express";
import { AuthRequest } from "./types/route_types";
import { User } from "../models/user/user";
import { hashValue } from "../util/util";
import { Post } from "../models/post";

const router = Router();

router.post("/users/:id", async (req: AuthRequest, res, next) => {
  try {
    const acc = req.account;
    if (acc.type !== 2) {
      throw new Error("Nu aveti permisiunea de a edita un user!");
    }

    const user = await new User().where({ id: req.params.id }).fetch(
      { require: false }
    );

    if (user === null) {
      throw new Error("Userul nu exista!");
    }

    await user.save({
      email: req.body.email,
      password: await hashValue(req.body.password),
    });

    res.json({
      success: true,
      message: "Userul a fost editat cu succes!"
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/users/:id", async (req: AuthRequest, res, next) => {
  try {
    const acc = req.account;
    if (acc.type !== 2) {
      throw new Error("Nu aveti permisiunea de a sterge un user!");
    }

    const user = await new User().where({ id: req.params.id }).fetch(
      { require: false }
    );

    if (user === null) {
      throw new Error("Userul nu exista!");
    }

    await user.destroy();

    res.json({
      success: true,
      message: "User was deleted succesfuly!"
    });
  } catch (err) {
    next(err);
  }
});

router.get("/users", async (req: AuthRequest, res, next) => {
  try {
    const acc = req.account;
    if (acc.type !== 2) {
      throw new Error("Nu aveti permisiunea de a vedea userii!");
    }

    const users = await new User().fetchAll();
    const obj = [];
    // get post count for each user
    for (const user of users.toJSON()) {
      const postCount = await new Post().where({ user_id: user.id }).count();
      obj.push({
        id: user.id,
        email: user.email,
        type: user.type,
        postCount: postCount
      });
    }

    res.json({
      success: true,
      users: obj
    });
  } catch (err) {
    next(err);
  }
});

export default router;