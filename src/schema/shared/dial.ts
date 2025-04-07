import { z } from "zod";
import { DNS_RULE_ACTION_ROUTE } from "../dns/rule_action";

export const SHARED_DIAL_DOMAIN_RESOLVER = DNS_RULE_ACTION_ROUTE.omit({
  action: true,
});

export const SHARED_DIAL = z
  .object({
    domain_resolver: SHARED_DIAL_DOMAIN_RESOLVER,
  })
  .partial();
