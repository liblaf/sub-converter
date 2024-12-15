import { z } from "zod";

export const PROVIDER_OPTIONS_SCHEMA = z.object({
  name: z.string(),
  base64: z
    .object({ url: z.string().url(), ua: z.string().optional() })
    .optional(),
  clash: z
    .object({
      url: z.string().url(),
      ua: z.string().default("clash.meta"), // https://wiki.metacubex.one/config/general/#ua
    })
    .optional(),
  jms: z.object({ service: z.string(), id: z.string() }).optional(),
  singbox: z
    .object({ url: z.string().url(), ua: z.string().default("sing-box") })
    .optional(),
  uri: z
    .object({ url: z.string().url(), ua: z.string().optional() })
    .optional(),
});

export type ProviderOptions = z.infer<typeof PROVIDER_OPTIONS_SCHEMA>;

export const PROVIDERS_SCHEMA = z.array(PROVIDER_OPTIONS_SCHEMA);
