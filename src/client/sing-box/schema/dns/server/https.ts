import { PORT } from "@lib/client/sing-box/schema";
import { z } from "zod";

export const DNS_SERVER_HTTPS = z
  .object({
    type: z.literal("https"),
    tag: z.string(),
    server: z.string(),
    server_port: PORT,
  })
  .partial()
  .required({ type: true, server: true });
