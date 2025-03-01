import { z } from "zod";

export const PROVIDER_SCHEMA = z.object({
  name: z.string(),
  "sing-box": z
    .object({ url: z.string().url(), ua: z.string().default("sing-box") })
    .optional(),
});

export type Provider = z.infer<typeof PROVIDER_SCHEMA>;

export const CONFIG_SCHEMA = z.object({ providers: z.array(PROVIDER_SCHEMA) });

export type Config = z.infer<typeof CONFIG_SCHEMA>;
