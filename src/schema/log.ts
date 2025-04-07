import { z } from "zod";

export const LOG = z
  .object({
    disabled: z.boolean(),
    level: z.enum(["trace", "debug", "info", "warn", "error", "fatal"]),
    output: z.string(),
    timestamp: z.boolean(),
  })
  .partial();
