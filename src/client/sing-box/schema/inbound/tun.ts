import { z } from "zod";
import { PORT } from "../rule-set";

export const INBOUND_TUN = z
  .object({
    type: z.literal("tun"),
    tag: z.string(),
    address: z.array(z.string()),
    auto_route: z.boolean(),
    strict_route: z.boolean(),
    platform: z
      .object({
        http_proxy: z
          .object({
            enabled: z.boolean(),
            server: z.string(),
            server_port: PORT,
            bypass_domain: z.array(z.string()),
            match_domain: z.array(z.string()),
          })
          .partial()
          .required({ server: true, server_port: true }),
      })
      .partial(),
  })
  .partial()
  .required({ type: true, tag: true });

export type InboundTun = z.infer<typeof INBOUND_TUN>;
