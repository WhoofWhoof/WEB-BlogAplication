import Db from "../../local_db/db";
import { UserType } from "./type";

const user: UserType = {} as UserType;

export class User extends Db.bookshelf.Model<User> {
  get tableName() {
    return "user";
  }
}
