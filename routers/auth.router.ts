import { Router } from "express";

export const authRouter = Router().get("/", (req, res) => {
  res.status(200).send("Hello clever programmers");
});
