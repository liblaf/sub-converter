import { z } from "zod";

export const DNS_SERVER_LOCAL = z
  .object({
    type: z.literal("local"),
    tag: z.string(),
  })
  .partial()
  .required({ type: true });
