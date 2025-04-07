import { z } from "zod";
import {
  RULE_SET_HEADLESS_RULE_DEFAULT_FIELDS,
  RULE_SET_HEADLESS_RULE_LOGICAL_FIELDS,
} from "../rule-set/headless-rule";
import {
  ROUTE_RULE_ACTION_HIJACK_DNS,
  ROUTE_RULE_ACTION_ROUTE,
  ROUTE_RULE_ACTION_SNIFF,
} from "./rule_action";
import { PROTOCOL } from "./sniff";

export const ROUTE_RULE_DEFAULT_FIELDS =
  RULE_SET_HEADLESS_RULE_DEFAULT_FIELDS.extend({
    protocol: z.array(PROTOCOL),
    ip_is_private: z.boolean(),
    clash_mode: z.string(),
    rule_set: z.array(z.string()),
  }).partial();

export const ROUTE_RULE_LOGICAL_FIELDS =
  RULE_SET_HEADLESS_RULE_LOGICAL_FIELDS.extend({
    rules: z.array(ROUTE_RULE_DEFAULT_FIELDS),
  });

export const ROUTE_RULE_RAW = ROUTE_RULE_DEFAULT_FIELDS.merge(
  ROUTE_RULE_LOGICAL_FIELDS.partial(),
);

export const ROUTE_RULE = z.discriminatedUnion("action", [
  ROUTE_RULE_RAW.merge(ROUTE_RULE_ACTION_ROUTE),
  ROUTE_RULE_RAW.merge(ROUTE_RULE_ACTION_HIJACK_DNS),
  ROUTE_RULE_RAW.merge(ROUTE_RULE_ACTION_SNIFF),
]);

export type RouteRule = z.infer<typeof ROUTE_RULE>;
