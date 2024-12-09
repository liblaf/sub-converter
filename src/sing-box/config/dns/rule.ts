import type { DNSRuleAction } from "./rule_action";

export type DNSRule = {
  // TODO: add more fields
  rule_set?: string[];
  invert?: boolean;
  clash_mode?: string;
  outbound?: string[];
} & DNSRuleAction;
