import dotenv from "dotenv";

const env = dotenv.config({ path: "./config/.env" }).parsed;

if (!env) throw new Error("No env file");

export const PORT = env.PORT;
