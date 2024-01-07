import * as moment from "moment";
import { createLogger, format, transports } from "winston";
import { runningServer } from "./running_server";

export function prettyJson(obj: Object) {
  return JSON.stringify(obj, undefined, 2);
}

const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, label, timestamp, ...other }) => {
  const pmId = process.env.pm_id;
  const processId = pmId ? `(${pmId})` : "";
  // Do not show timestamp if running on PM2. The timestamp will be shown by
  // pm2
  if (pmId) {
    timestamp = "";
  } else {
    timestamp += " ";
  }

  return `${timestamp}[${label}]${processId} ${level}: ${other.message}`;
});

export const logger = createLogger({
  level: "debug",
  format: format.combine(format.splat(), format.simple()),
  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        label({ label: runningServer.getRunningServerName() }),
        timestamp(
          {
            format: () => moment().format("YYYY-MM-DD HH:mm:ss.SSS Z")}
          ),
        myFormat
      )
    }),
  ],
  exceptionHandlers: [
    new transports.Console(),
  ]
});