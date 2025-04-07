import { z } from "zod";

export const PROVIDER_SINGBOX = z.object({
  url: z.string().url(),
  ua: z.string().default("sing-box"),
});
export type ProviderSingbox = z.infer<typeof PROVIDER_SINGBOX>;

export const PROVIDER_JMS = z.object({
  url: z.string().url(),
  ua: z.string().optional(),
});
export type ProviderJms = z.infer<typeof PROVIDER_JMS>;

export const PROVIDER = z.object({
  name: z.string(),
  singbox: PROVIDER_SINGBOX.optional(),
  jms: PROVIDER_JMS.optional(),
});
export type Provider = z.infer<typeof PROVIDER>;

export const CONFIG = z.object({ providers: z.array(PROVIDER) });
export type Config = z.infer<typeof CONFIG>;
