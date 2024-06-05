import { Router } from "express";
import { CreateUserRequest, Role } from "../types";
import { pool } from "../utils/db";
import { genSalt, hash } from "bcrypt";
import { v4 as uuid } from "uuid";

export const userRouter = Router()
  // Dodawanie użytkownika
  .post("/", async (req, res) => {
    const { confirmPassword, email, firstName, lastName, password, playerTag } =
      req.body as CreateUserRequest;

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

    res.status(201).json({
      message: "Użytkownik został poprawnie stworzony",
    });
  });
