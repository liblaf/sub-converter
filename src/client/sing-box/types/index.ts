export type { DNS, DNSServer } from "./dns";
export type { Inbound, InboundMixed, InboundTun } from "./inbound";
export type { Outbound, OutboundSelector, OutboundUrltest } from "./outbound";
export type { Route, RouteRule } from "./route";
export type { RuleSet, RuleSetRemote } from "./rule-set";
export type { ListenFields } from "./shared";

import type { DNS } from "./dns";
import type { Inbound } from "./inbound";
import type { Outbound } from "./outbound";
import type { Route } from "./route";

export type Config = {
  // https://sing-box.sagernet.org/configuration/
  log?: object;
  dns?: DNS;
  ntp?: object;
  endpoints?: object[];
  inbounds?: Inbound[];
  outbounds?: Outbound[];
  route?: Route;
  experimental?: object;
};
