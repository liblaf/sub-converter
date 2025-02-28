import { z } from "zod";

const ROUTE_OPTIONS = z
  .object({
    disable_cache: z.boolean(),
    rewrite_ttl: z.boolean(),
    client_subnet: z.string(),
  })
  .partial();

export const DNS_RULE_ACTION_ROUTE = z
  .object({
    action: z.literal("route").default("route"),
    server: z.string(),
  })
  .merge(ROUTE_OPTIONS)
  .partial()
  .required({ server: true });

export const DNS_RULE_ACTION_ROUTE_OPTIONS = z
  .object({
    action: z.literal("route-options"),
  })
  .merge(ROUTE_OPTIONS)
  .partial()
  .required({ action: true });

export const DNS_RULE_ACTION_REJECT = z
  .object({ action: z.literal("reject") })
  .partial()
  .required({ action: true });
