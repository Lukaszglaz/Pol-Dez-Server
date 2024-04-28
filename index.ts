import express from "express";
import { PORT } from "./config/config";

const app = express();

app.listen(Number(PORT), () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
