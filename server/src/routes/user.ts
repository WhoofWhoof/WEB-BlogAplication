import { Router } from "express";
import { AuthRequest } from "./types/route_types";
import { isUndefined } from "lodash";
import * as jwt from "jsonwebtoken";

const router = Router();

router.get("/is-logged/:uniqueId",
  async (req: AuthRequest, res, next) => {
  try {
    const acc = req.account;

    if (!isUndefined(acc)) {
      const token = jwt.sign(
        { id: acc.id,
          email: acc.email,
          type: acc.type,
         },
        <string>process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.json({
        status: "success",
        success: true,
        token: token,
        userData: {
          id: acc.id,
          email: acc.email,
          type: acc.type,
        }
      });
    }
  } catch (err) {
    next(err);
  }
});

import post from "./post";
router.use("/post", post);

export default router;
