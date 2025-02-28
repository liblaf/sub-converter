import { z } from "zod";

export const ROUTE_RULE_ACTION_ROUTE = z
  .object({
    action: z.literal("route").default("route"),
    outbound: z.string(),
  })
  .partial()
  .required({ outbound: true });

export const ROUTE_RULE_ACTION_HIJACK_DNS = z
  .object({
    action: z.literal("hijack-dns"),
  })
  .partial()
  .required({ action: true });

export const ROUTE_RULE_ACTION_SNIFF = z
  .object({ action: z.literal("sniff") })
  .partial()
  .required({ action: true });
