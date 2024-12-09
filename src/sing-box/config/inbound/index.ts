export { defineInboundMixed } from "./mixed";
export type { InboundMixed } from "./mixed";
export { defineInboundTun } from "./tun";
export type { InboundTun } from "./tun";

import { type InboundMixed, defineInboundMixed } from "./mixed";
import type { InboundTun } from "./tun";

export type Inbound = InboundMixed | InboundTun;

export function defineInbounds(inbounds?: Inbound[]): Inbound[] {
  if (inbounds !== undefined) return inbounds;
  return [defineInboundMixed()];
}
