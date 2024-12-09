export { defineDNS } from "./dns";
export type {
  DNS,
  DNSRule,
  DNSRuleAction,
  DNSRuleActionReject,
  DNSRuleActionRoute,
  DNSRuleActionRouteOptions,
  DNSServer,
} from "./dns";
export {
  defineInboundMixed,
  defineInboundTun,
  defineInbounds,
} from "./inbound";
export type { Inbound, InboundMixed, InboundTun } from "./inbound";
export { defineLog } from "./log";
export type { Log } from "./log";
export type { ListenFields } from "./shared";

import * as R from "remeda";
import { type DNS, defineDNS } from "./dns";
import { type Inbound, defineInbounds } from "./inbound";
import { type Log, defineLog } from "./log";

export type Config = {
  log?: Log;
  dns?: DNS;
  ntp?: undefined; // TODO: add NTP
  endpoints?: undefined[]; // TODO: add Endpoint
  inbounds?: Inbound[];
  outbounds?: undefined[]; // TODO: add Outbound
  route?: undefined; // TODO: add Route
  experimental?: undefined; // TODO: add Experimental
};

export function defineConfig(config: Partial<Config> = {}): Config {
  return R.mergeDeep(
    { log: defineLog(), dns: defineDNS(), inbounds: defineInbounds() },
    config,
  );
}
