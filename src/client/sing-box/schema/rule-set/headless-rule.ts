import { z } from "zod";

export const PORT = z.number().int().nonnegative().max(65535);

export const RULE_SET_HEADLESS_RULE_DEFAULT_FIELDS = z
  .object({
    domain: z.array(z.string()),
    port: z.array(PORT),
    invert: z.boolean(),
  })
  .partial();

export const RULE_SET_HEADLESS_RULE_LOGICAL_FIELDS = z.object({
  type: z.literal("logical"),
  mode: z.enum(["and", "or"]),
  rules: z.array(RULE_SET_HEADLESS_RULE_DEFAULT_FIELDS),
});

export const RULE_SET_HEADLESS_RULE = z.union([
  RULE_SET_HEADLESS_RULE_DEFAULT_FIELDS,
  RULE_SET_HEADLESS_RULE_LOGICAL_FIELDS,
]);
