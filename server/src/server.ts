import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({path: path.resolve(__dirname, "../.env")});

import multer = require("multer");
import fs = require("fs");
import * as express from "express";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import homeRoutes from "./routes/home";
import adminRoutes from "./routes/admin";

import moment = require("moment");

import { runningServer, ServerEnum } from "./util/running_server";
runningServer.setRunningServer(ServerEnum.main);

import { logger } from "./util/logger";
import * as loggerMorgan from "morgan";
import { auth } from "./util/passport";
import * as cors from "cors";
import bodyParser = require("body-parser");

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(loggerMorgan("dev"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const corsOptions = {
  origin: `http://localhost:4000`,
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));

app.use("/uploads", express.static(
  path.join(__dirname, "../src/public/images")));
app.use("/auth", authRoutes);
app.use("/user", auth.authorize(), userRoutes);
app.use("/home", homeRoutes);
app.use("/posts", auth.authorize(), postRoutes);
app.use("/admin", auth.authorize(), adminRoutes);

function logErrors(err: any,
                   req: express.Request,
                   res: express.Response,
                   next: express.NextFunction) {
  logger.error("Error for [%s] : %s %s",
    moment().format("YYYY-MM-DD hh:mm:ss"),
    req.url, err);
  next(err);
}

app.use(logErrors);

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  logger.info(("App is running at http://localhost:%d in %s mode"),
              app.get("port"), app.get("env"));
  logger.info("Press CTRL-C to stop\n");
});

module.exports = app;

import * as blocked from "blocked";
blocked((time: number) => {
  if (time > 1000) {
    logger.error(`Main server blocked for ${time}ms`);
  }
  logger.info(`Main server blocked for ${time}ms`);
}, {threshold: 50});