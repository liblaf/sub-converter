import { z } from "zod";

export const OUTBOUND_URLTEST = z
  .object({
    type: z.literal("urltest"),
    tag: z.string(),
    outbounds: z.array(z.string()),
    url: z.string(),
  })
  .partial()
  .required({ type: true, tag: true, outbounds: true });

export type OutboundUrltest = z.infer<typeof OUTBOUND_URLTEST>;
