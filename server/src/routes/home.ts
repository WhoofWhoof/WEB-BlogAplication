import { Router } from "express";
import { AuthRequest } from "./types/route_types";
import { PostManager } from "../services/post.manager";

const router = Router();

router.get("/random-posts",
  async (req: AuthRequest, res, next) => {
    try {
      const posts = await new PostManager().getRandomPosts();
      res.json(posts);
      // res.json(posts);
    } catch (err) {
      next(err);
    }
});

export default router;
