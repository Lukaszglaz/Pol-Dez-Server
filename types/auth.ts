import { Response } from "express";
import { User } from "./user";

// export interface AuthResponse extends Response {
//   user: User;
// }

export interface JwtPayload {
  userId: string;
}
