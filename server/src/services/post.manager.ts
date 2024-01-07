import { Post } from "../models/post";
import { isNil } from "lodash";
import * as fs from "fs";
import { User } from "../models/user/user";

type RandomPostType = {
  email: string;
  title: string;
  description: string;
  image?: any;
};

export class PostManager {
  constructor() {}

  async getUserPosts(userId: number): Promise<Post[]> {
    const posts = await new Post().query(qb => {
      qb.where("user_id", userId);
    }).fetchAll();
    // change email to actual email
    const actualPosts = posts.toJSON();

    const user = await new User().where("id", userId).fetch();
    for (const post of actualPosts) {
      post.email = user.get("email");
    }
    return actualPosts;
  }

  async getPostById(postId: number): Promise<Post> {
    const post = await new Post().where("id", postId).fetch();
    return post.toJSON();
  }

  async deletePost(postId: number): Promise<void> {
    await new Post().where("id", postId).destroy();
  }

  async getRandomPosts(): Promise<RandomPostType[]> {
    const posts = await new Post().query(qb => {
      qb.orderByRaw("RANDOM()");
      qb.limit(10);
    }).fetchAll();
    let images: any[] = [];
    fs.readdir("../src/public/images", (err, files) => {
      // get only images that are the same filename as the posts.image
      if (!err) {
        const matchingImages = files.filter(file => {
          return posts.toJSON().some(post => {
            return post.image === file;
          });
        });
        images = matchingImages;
      }
    });
    // fetch user data for user_id of post and add to post object
    const obj: RandomPostType[] = [];
    for (const post of posts.toJSON()) {
      const user = await new User().where("id", post.user_id).fetch();
      obj.push({
        email: user.get("email"),
        title: post.title,
        description: post.description,
        image: images.find(image => image === post.image),
      });
    }
    return obj;
  }

  async getPosts(postIds: number[]): Promise<Post[]> {
    const posts = await new Post().query(qb => {
      qb.whereIn("id", postIds);
    }).fetchAll();
    return posts.toJSON();
  }

  async createPost(data: any): Promise<void> {
    if (isNil(data.title)) {
      throw new Error("Title is required");
    }
    if (isNil(data.description)) {
      throw new Error("Description is required");
    }

    let post = undefined;
    if (!isNil(data.image)) {
      post = new Post({
        user_id: data.userId,
        title: data.title,
        description: data.description,
        image: data.image,
      });
    } else {
      post = new Post({
        user_id: data.userId,
        title: data.title,
        description: data.description,
      });
    }

    await post.save();
  }
}