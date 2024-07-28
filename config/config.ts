import dotenv from "dotenv";

const env = dotenv.config({ path: "./config/.env" }).parsed;

if (!env) throw new Error("No env file");

export const PORT = env.PORT;

export const CLIENT_ADDRESS = env.CLIENT_ADDRESS;

export const JWT_SECRET = env.JWT_SECRET;

export const NODEMAILER_HOST = env.NODEMAILER_HOST;
export const NODEMAILER_PORT = env.NODEMAILER_PORT;
export const NODEMAILER_SECURE = env.NODEMAILER_SECURE;
export const NODEMAILER_USER = env.NODEMAILER_USER;
export const NODEMAILER_PASS = env.NODEMAILER_PASS;

export const CLASH_EMAIL = env.CLASH_EMAIL;
export const CLASH_PASSWORD = env.CLASH_PASSWORD;
