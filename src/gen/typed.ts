import { z } from "zod";

export const SCHEMA_PORT: z.ZodNumber = z.coerce
  .number()
  .int()
  .min(0)
  .max(65535);

export const SCHEMA_GEN_OPTIONS: z.ZodObject<{
  emoji: z.ZodDefault<z.ZodBoolean>;
  icon: z.ZodDefault<z.ZodBoolean>;
  port: z.ZodDefault<z.ZodNumber>;
}> = z.object({
  emoji: z.boolean().default(false),
  icon: z.boolean().default(true),
  port: SCHEMA_PORT.default(7892),
});

export type GenOptions = z.infer<typeof SCHEMA_GEN_OPTIONS>;

export type GenOptionsInput = z.input<typeof SCHEMA_GEN_OPTIONS>;
