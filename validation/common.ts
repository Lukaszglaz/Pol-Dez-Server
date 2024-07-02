import { ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";
import { Validation } from "../types";

const errorSeparator = "{errorSeparator}";

export function checkValidation(
  data: any,
  schema: ZodSchema
): Validation[] | null {
  const results = schema.safeParse(data);
  return results.success
    ? null
    : fromZodError(results.error, { issueSeparator: errorSeparator })
        .message.replace("Validation error: ", "")
        .split(errorSeparator)
        .map((e) => ({
          key: e.slice(e.indexOf(". at") + 6, e.length - 1),
          error: e.slice(0, e.indexOf(". at") + 1),
        }));
}
