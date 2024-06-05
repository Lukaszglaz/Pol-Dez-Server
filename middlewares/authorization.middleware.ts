import { NextFunction, Request, Response } from "express";
import { pool } from "../utils/db";
import { JwtPayload, UserResults } from "../types";
import { ValidationError } from "./error-handler.middleware";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwt = req.cookies.jwt;
  if (!jwt) throw new ValidationError("Brak ciasteczka autoryzującego");

  // Sprawdzenie czy token nie wygasł
  const token = verify(jwt, JWT_SECRET) as JwtPayload;

  const [results] = (await pool.execute("SELECT * FROM users WHERE id = :id ", {
    id: token.userId,
  })) as UserResults;
  const user = results[0];

  if (!user) {
    throw new ValidationError("Nie znaleziono użytkownika z podanym tokenem");
  }

  (res as any).user = user;

  next();
};
