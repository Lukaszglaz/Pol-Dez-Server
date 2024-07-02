import { z } from "zod";
import { ForgotPasswordSchema } from "../validation/schemas";

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>;
