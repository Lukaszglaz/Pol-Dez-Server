import { Response, Router } from "express";
import { Role, UserResponse, UserResults } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../middlewares/error-handler.middleware";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";
import asyncMiddleware from "middleware-async";

export const authRouter = Router()
  .get("/is-logged", asyncMiddleware(authorizationMiddleware), (req, res) => {
    res.status(200).json({
      message: "Użytkownik jest aktualnie zalogowany",
      results: (res as any).user,
    });
  })

  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    const [results] = (await pool.execute(
      "SELECT * FROM users WHERE email = :email ",
      {
        email,
      }
    )) as UserResults;
    const user = results[0];

    if (!user) throw new ValidationError("Błędny email lub haslo");

    const match = await compare(password, user.password);
    if (!match) throw new ValidationError("Błędny email lub haslo");

    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Użytkownik został poprawnie zalogowany",
      results: {
        user: {
          id: user.id,
          name: user.name,
          role: user.role,
        },
        token,
      },
    });
  })

  .get("/logout", asyncMiddleware(authorizationMiddleware), (req, res) => {
    res.status(200).json({
      message: "Użytkownik został poprawnie wylogowany",
    });
  });
