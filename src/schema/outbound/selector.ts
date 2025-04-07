import { z } from "zod";

export const OUTBOUND_SELECTOR = z
  .object({
    type: z.literal("selector"),
    tag: z.string(),
    outbounds: z.array(z.string()),
  })
  .partial()
  .required({ type: true, tag: true, outbounds: true });

export type OutboundSelector = z.infer<typeof OUTBOUND_SELECTOR>;
