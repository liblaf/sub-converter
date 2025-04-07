import { z } from "zod";

export { PORT } from "./headless-rule";

export const RULE_SET_REMOTE = z
  .object({
    type: z.literal("remote"),
    tag: z.string(),
    format: z.enum(["source", "binary"]),
    url: z.string().url(),
    download_detour: z.string(),
  })
  .partial()
  .required({ type: true, tag: true, format: true, url: true });

export type RuleSetRemote = z.infer<typeof RULE_SET_REMOTE>;

export const RULE_SET = z.discriminatedUnion("type", [RULE_SET_REMOTE]);

export type RuleSet = z.infer<typeof RULE_SET>;
