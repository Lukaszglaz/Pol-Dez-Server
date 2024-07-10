import express from "express";
import "express-async-errors";
import { CLASH_KEY, PORT } from "./config/config";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { authRouter, panelRouter, userRouter } from "./routers";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Client } from "clashofclans.js";

// console.log(process.env);

export const client = new Client({
  keys: [CLASH_KEY],
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/panel", panelRouter);

app.use(errorHandler);

app.listen(Number(PORT), () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
