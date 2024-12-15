export type { InboundMixed } from "./mixed";
export type { InboundTun } from "./tun";

import type { InboundMixed } from "./mixed";
import type { InboundTun } from "./tun";

export type Inbound = InboundMixed | InboundTun;
