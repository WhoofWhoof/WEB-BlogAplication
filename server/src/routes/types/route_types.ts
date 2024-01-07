import { Request } from "express";

export interface AuthRequest extends Request {
  account: AuthAccount;
}