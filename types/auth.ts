import { Response } from "express";
import { User } from "./user";
import { FieldPacket } from "mysql2";

// export interface AuthResponse extends Response {
//   user: User;
// }

export interface JwtPayload {
  userId: string;
}
export interface Token {
  id: string;
  userId: string;
  expiredAt: Date;
}

export type TokenResults = [Token[], FieldPacket[]];

export interface ResetPasswordRequest {
  password: string;
  confirmPassword: string;
}
