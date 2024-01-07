import * as Knex from "knex";
import * as Bookshelf from "bookshelf";

class Db {

  private static knex: Knex = Knex({
    client: "sqlite3",
    connection: {
      filename: "../data/dev.sqlite3",
      charset  : "utf8"
    },
  });

  public static bookshelf: Bookshelf = Bookshelf(Db.knex);
}

export default Db;