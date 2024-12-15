export type { Outbound } from "./outbound";
export type { Route, RouteRule } from "./route";
export type { RuleSet, RuleSetRemote } from "./rule-set";

import type { Outbound } from "./outbound";
import type { Route } from "./route";

export type Config = {
  // https://sing-box.sagernet.org/configuration/
  log?: object;
  dns?: object;
  ntp?: object;
  endpoints?: object[];
  inbounds?: object[];
  outbounds?: Outbound[];
  route?: Route;
  experimental?: object;
};
