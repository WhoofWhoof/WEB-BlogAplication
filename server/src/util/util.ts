import { User } from "../models/user/user";
import * as jwt from "jsonwebtoken";
import { genSalt, hash } from "bcrypt";

import { padStart } from "lodash";

export function formatDate(date: Date | string, time = true) {
  const jsDate = new Date(date);

  let formattedDate = "";
  formattedDate += padStart(jsDate.getDate().toString(), 2, "0");
  formattedDate += "-" + padStart((jsDate.getMonth() + 1).toString(), 2, "0");
  formattedDate += "-" + jsDate.getFullYear();
  if (time) {
    formattedDate += " " + padStart(jsDate.getHours().toString(), 2, "0");
    formattedDate += ":" + padStart(jsDate.getMinutes().toString(), 2, "0");
  }

  return formattedDate;
}

export function generateToken(user: User) {

  const payload = {
    id: user.get("id"),
    email: user.get("email"),
    type: user.get("type"),
  };

  const token = jwt.sign(payload, <string>process.env.JWT_SECRET, {
    expiresIn: "24h" // expires in 24 hours
  });

  return token;
}

export function generateTokenAccount(user: AuthAccount) {

  const payload = {
    id: user.id,
    email: user.email,
    type: user.type,
  };

  const token = jwt.sign(payload, <string>process.env.JWT_SECRET, {
    expiresIn: "24h" // expires in 24 hours
  });

  return token;
}

export async function hashValue(value: string) {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  const hashed = await hash(value, salt);
  return hashed;
}
