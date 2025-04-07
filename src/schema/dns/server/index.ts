import { z } from "zod";

// TODO: since sing-box 1.12.0
// export const DNS_SERVER = z.discriminatedUnion("type", [
//   DNS_SERVER_LOCAL,
//   DNS_SERVER_HTTPS,
// ]);

export const DNS_SERVER = z
  .object({
    tag: z.string(),
    address: z.string(),
    detour: z.string(),
  })
  .partial()
  .required({ tag: true, address: true });
