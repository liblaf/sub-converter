import { z } from "zod";
import { DNS } from "./dns";
import { EXPERIMENTAL } from "./experimental";
import { INBOUND } from "./inbound";
import { LOG } from "./log";
import { OUTBOUND } from "./outbound";
import { ROUTE } from "./route";

export { INBOUND } from "./inbound";
export type { Inbound, InboundMixed, InboundTun } from "./inbound";
export { OUTBOUND } from "./outbound";
export type {
  Outbound,
  OutboundDirect,
  OutboundSelector,
  OutboundUrltest,
} from "./outbound";
export type { RouteRule } from "./route";
export { PORT } from "./rule-set";
export type { RuleSet, RuleSetRemote } from "./rule-set";

export const SINGBOX_SCHEMA = z
  .object({
    $schema: z.string(),
    log: LOG,
    dns: DNS,
    route: ROUTE,
    inbounds: z.array(INBOUND),
    outbounds: z.array(OUTBOUND),
    experimental: EXPERIMENTAL,
  })
  .partial();

export type Singbox = z.infer<typeof SINGBOX_SCHEMA>;
