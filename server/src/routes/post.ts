import { Router } from "express";
import { AuthRequest } from "./types/route_types";
import { isNil, isUndefined } from "lodash";
import { PostManager } from "../services/post.manager";
import multer = require("multer");
const path = require("path");

const router = Router();

router.delete("/delete-post/:postId", async (req: AuthRequest, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.account.id;

    const post: any = await new PostManager().getPostById(+postId);
    if (post.user_id === userId) {
      await new PostManager().deletePost(+postId);
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
        message: "You are not authorized to delete this post!",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/user-posts", async (req: AuthRequest, res, next) => {
  try {
    const id = req.account.id;
    const posts = await new PostManager().getUserPosts(id);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post("/upload", async (req: AuthRequest, res, next) => {
  try {
    upload(req, res, async (err: any) => {
      if (err) {
        res.json({
          success: false,
          message: err.message,
        });
      } else {
        const data = {
          userId: req.account.id,
          title: req.body.title,
          description: req.body.description,
          image: req.file.filename,
        };
        await new PostManager().createPost(data);
        res.json({
          success: true,
        });
      }
    });
  } catch (err) {
  next(err);
  }
});

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(undefined, "../src/public/images");
  },
  filename: function (req: any, file: any, cb: any) {
    if (isNil(file)) {
      return cb(new Error("File is undefined"));
    }
    cb(undefined, file.fieldname + "-" + Date.now() + ".jpg");
  }
});

function checkFileType(file: any, cb: any) {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(undefined, true);
  } else {
    cb("Please Upload Images Only!");
  }
}

const upload = multer({
  storage: storage,
  limits: {fileSize: 5000000 },
  fileFilter: function (req: any, file: any, cb: any) {
    checkFileType(file, cb);
  }
}).single("file");

export default router;
