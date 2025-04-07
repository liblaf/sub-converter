import { z } from "zod";
import { RULE_SET } from "../rule-set";
import { SHARED_DIAL_DOMAIN_RESOLVER } from "../shared/dial";
import { ROUTE_RULE } from "./rule";

export type { RouteRule } from "./rule";

export const ROUTE = z
  .object({
    rules: z.array(ROUTE_RULE),
    rule_set: z.array(RULE_SET),
    final: z.string(),
    auto_detect_interface: z.boolean(),
    default_domain_resolver: SHARED_DIAL_DOMAIN_RESOLVER,
  })
  .partial();
