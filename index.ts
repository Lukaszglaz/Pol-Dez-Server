import express from "express";
import { PORT } from "./config/config";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { authRouter, userRouter } from "./routers";
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";

// console.log(process.env);

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

app.use(errorHandler);

app.listen(Number(PORT), () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
