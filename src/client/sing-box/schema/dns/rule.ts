import { z } from "zod";
import {
  RULE_SET_HEADLESS_RULE_DEFAULT_FIELDS,
  RULE_SET_HEADLESS_RULE_LOGICAL_FIELDS,
} from "../rule-set/headless-rule";
import {
  DNS_RULE_ACTION_REJECT,
  DNS_RULE_ACTION_ROUTE,
  DNS_RULE_ACTION_ROUTE_OPTIONS,
} from "./rule_action";

export const DNS_RULE_DEFAULT_FIELDS =
  RULE_SET_HEADLESS_RULE_DEFAULT_FIELDS.extend({
    clash_mode: z.string(),
    rule_set: z.array(z.string()),
    outbound: z.array(z.string()), // TODO: deprecated in sing-box 1.12.0
  }).partial();

export const DNS_RULE_ADDRESS_FILTER_FIELDS = z
  .object({
    ip_is_private: z.boolean(),
  })
  .partial();

export const DNS_RULE_LOGICAL_FIELDS =
  RULE_SET_HEADLESS_RULE_LOGICAL_FIELDS.extend({
    rules: z.array(
      DNS_RULE_DEFAULT_FIELDS.merge(DNS_RULE_ADDRESS_FILTER_FIELDS),
    ),
  });

export const DNS_RULE_RAW = DNS_RULE_DEFAULT_FIELDS.merge(
  DNS_RULE_ADDRESS_FILTER_FIELDS,
).merge(DNS_RULE_LOGICAL_FIELDS.partial());

export const DNS_RULE = z.discriminatedUnion("action", [
  DNS_RULE_RAW.merge(DNS_RULE_ACTION_ROUTE),
  DNS_RULE_RAW.merge(DNS_RULE_ACTION_ROUTE_OPTIONS),
  DNS_RULE_RAW.merge(DNS_RULE_ACTION_REJECT),
]);
