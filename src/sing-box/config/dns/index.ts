export type { FakeIP } from "./fakeip";
export type { DNSRule } from "./rule";
export type {
  DNSRuleAction,
  DNSRuleActionReject,
  DNSRuleActionRoute,
  DNSRuleActionRouteOptions,
} from "./rule_action";
export type { DNSServer } from "./server";

import type { FakeIP } from "./fakeip";
import type { DNSRule } from "./rule";
import type { DNSServer } from "./server";

export type DNS = {
  servers?: DNSServer[];
  rules?: DNSRule[];
  final?: string;
  strategy?: "prefer_ipv4" | "prefer_ipv6" | "ipv4_only" | "ipv6_only";
  disable_cache?: boolean;
  disable_expire?: boolean;
  independent_cache?: boolean;
  cache_capacity?: number;
  reverse_mapping?: boolean;
  client_subnet?: string;
  fakeip?: FakeIP;
};

export function defineDNS(dns: Partial<DNS> = {}): DNS {
  return {
    servers: [
      { tag: "dns:proxy", address: "https://8.8.8.8/dns-query" },
      { tag: "dns:local", address: "8.8.8.8", detour: "DIRECT" },
      { tag: "dns:reject", address: "rcode://refused" },
    ],
    rules: [
      { outbound: ["any"], action: "route", server: "dns:local" },
      { rule_set: ["geosite:private"], action: "route", server: "dns:local" },
      { clash_mode: "direct", action: "route", server: "dns:local" },
      { clash_mode: "global", action: "route", server: "dns:proxy" },
      { rule_set: ["geosite:cn"], action: "route", server: "dns:local" },
      {
        type: "logical",
        mode: "and",
        rules: [
          { rule_set: ["geosite:proxy"], invert: true },
          { rule_set: ["geoip:cn"] },
        ],
        server: "dns:proxy",
        client_subnet: "101.6.6.6",
      },
    ],
    final: "dns:proxy",
    independent_cache: true,
    ...dns,
  };
}
