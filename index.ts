import express from "express";
import { PORT } from "./config/config";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { authRouter } from "./routers";

const app = express();

app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(Number(PORT), () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
