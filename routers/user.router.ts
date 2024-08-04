import { Router } from "express";
import { CreateUserRequest, MailKey, Role, UserResults } from "../types";
import { pool } from "../utils/db";
import { genSalt, hash } from "bcrypt";
import { v4 as uuid, validate } from "uuid";
import { ValidationError } from "../middlewares/error-handler.middleware";
import { checkValidation } from "../validation/common";
import { CreateUserSchema } from "../validation/schemas";
import { sendMail } from "../utils/email.util";

export const userRouter = Router()
  // Dodawanie użytkownika
  .post("/", async (req, res) => {
    const { confirmPassword, email, firstName, lastName, password, playerTag } =
      req.body as CreateUserRequest;

    const validation = checkValidation(req.body, CreateUserSchema) || [];

    const [result] = (await pool.execute(
      "SELECT `email` from `users` WHERE `email` = :email",
      {
        email,
      }
    )) as UserResults;

    if (result.length > 0) {
      validation.push({
        error: "The user with the specified e-mail address already exists.",
        key: "E-mail",
      });
    }

    if (confirmPassword !== password) {
      validation.push({
        error: "Hasła muszą być takie same",
        key: "passwordEquality",
      });
    }
    const [result2] = (await pool.execute(
      "SELECT `playerTag` from `users` WHERE `playerTag` = :playerTag",
      {
        playerTag,
      }
    )) as UserResults;

    if (result2.length > 0) {
      validation.push({
        error: "The player's tag is already taken.",
        key: "Player Tag",
      });
    }
    if (validation.length > 0) {
      throw new ValidationError(validation.map((v) => v.error).join("\n"));
    }

    const solt = await genSalt(10);
    const passwordHash = await hash(password, solt);

    await pool.execute(
      "INSERT INTO `users`(`id`, `name`, `lastName`,`email`, `password`,  `role`,`playerTag` ) VALUES(:id, :name, :lastName, :email, :password, :role, :playerTag)",
      {
        id: uuid(),
        name: firstName,
        lastName: lastName,
        email: email,
        password: passwordHash,
        role: Role.User,
        playerTag: playerTag,
      }
    );

    await sendMail(email, MailKey.signup);

    res.status(201).json({
      message: "The user has been correctly created.",
    });
  });
