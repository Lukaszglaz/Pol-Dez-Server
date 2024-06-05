import { FieldPacket } from "mysql2";

export type UserResults = [User[], FieldPacket[]];

export interface UserResponse {
  role: Role;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export enum Role {
  User = "User",
  Admin = "Admin",
}

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  playerTag: string;
}
