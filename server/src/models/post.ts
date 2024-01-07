import Db from "../local_db/db";

export class Post extends Db.bookshelf.Model<Post> {
  get tableName() {
    return "post";
  }
}