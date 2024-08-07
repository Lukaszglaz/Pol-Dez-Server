import { Response, Router, query } from "express";
import { sendMail } from "../utils/email.util";
import {
  ForgotPasswordRequest,
  MailKey,
  ResetPasswordRequest,
  Role,
  TokenResults,
  UserResponse,
  UserResults,
} from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../middlewares/error-handler.middleware";
import { compare, genSalt, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { CLIENT_ADDRESS, JWT_SECRET } from "../config/config";
import { authorizationMiddleware } from "../middlewares/authorization.middleware";
import asyncMiddleware from "middleware-async";
import { checkValidation } from "../validation/common";
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "../validation/schemas";
import { v4 as uuid } from "uuid";

export const authRouter = Router()
  .post("/login", async (req, res) => {
    const { email, password } = req.body;

    const [results] = (await pool.execute(
      "SELECT * FROM users WHERE email = :email ",
      {
        email,
      }
    )) as UserResults;
    const user = results[0];

    if (!user) throw new ValidationError("Incorrect email or password.");

    const match = await compare(password, user.password);
    if (!match) throw new ValidationError("Incorrect email or password.");

    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({
      message: "You have successfully logged in.",
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

  .post("/forgot-password", async (req, res) => {
    // Walidacja

    const { email } = req.body as ForgotPasswordRequest;

    const validation = checkValidation(req.body, ForgotPasswordSchema) || [];

    if (validation.length !== 0) {
      throw new ValidationError(validation.map((v) => v.error).join("\n"));
    }

    const [result] = (await pool.execute(
      "SELECT `email`, `id`, `name` from `users` WHERE `email` = :email",
      {
        email,
      }
    )) as UserResults;

    if (result.length === 0) {
      res.status(200).json({
        message:
          "If there is such a user, we have sent them an e-mail to their mailbox.",
      });
    }

    // Stworzenie Tokenu
    const tokenId = uuid();
    await pool.execute(
      "INSERT INTO `tokens`(`id`, `expiredAt`, `userId`) VALUES(:id, :expiredAt, :userId)",
      {
        id: tokenId,
        expiredAt: new Date(new Date().getTime() + 1000 * 60 * 10),
        userId: result[0].id,
      }
    );

    // Wysyłka maila

    await sendMail(email, MailKey.forgotPassword, {
      firstName: result[0].name,
      resetLink: `${CLIENT_ADDRESS}/reset-password/${tokenId}`,
    });

    // Wysyłka wiadomości zwrotnej

    res.status(200).json({
      message:
        "If there is such a user, we have sent them an e-mail to their mailbox.",
    });
  })

  .patch("/reset-password/:tokenId", async (req, res) => {
    const { confirmPassword, password } = req.body as ResetPasswordRequest;

    // Pobranie użytkownika

    const [tokens] = (await pool.execute(
      "SELECT * FROM tokens WHERE id = :id ",
      {
        id: req.params.tokenId,
      }
    )) as TokenResults;

    if (tokens.length === 0) throw new ValidationError("Token not found.");

    if (tokens[0].expiredAt.getTime() < new Date().getTime()) {
      (await pool.execute("DELETE FROM tokens  WHERE id = :id", {
        id: tokens[0].id,
      })) as TokenResults;
      throw new ValidationError("Token expired, please send request again.");
    }
    const [users] = (await pool.execute("SELECT * FROM users WHERE id = :id ", {
      id: tokens[0].userId,
    })) as TokenResults;

    if (users.length === 0) throw new ValidationError("User not found.");
    // Walidacja

    const validation = checkValidation(req.body, ResetPasswordSchema) || [];

    if (confirmPassword !== password) {
      validation.push({
        error: "Passwords must be the same.",
        key: "passwordEquality",
      });
    }

    if (validation.length !== 0) {
      throw new ValidationError(validation.map((v) => v.error).join("\n"));
    }
    // Zmiana hasła dla użytkownka

    const solt = await genSalt(10);
    const hashedPassword = await hash(password, solt);

    (await pool.execute(
      "UPDATE users SET password = :password WHERE id = :id",
      {
        password: hashedPassword,
        id: users[0].id,
      }
    )) as TokenResults;

    // Usunięcie tokenu

    (await pool.execute("DELETE FROM tokens  WHERE id = :id", {
      id: tokens[0].id,
    })) as TokenResults;

    // Wysyłka wiadomości zwrotnej

    res.status(200).json({
      results: "The password has been changed correctly.",
    });
  })

  .get("/logout", asyncMiddleware(authorizationMiddleware), (req, res) => {
    res.status(200).json({
      message: "The user was successfully logged out.",
    });
  })
  .get("/is-logged", asyncMiddleware(authorizationMiddleware), (req, res) => {
    res.status(200).json({
      message: "The user is currently logged in.",
      results: (res as any).user,
    });
  });
