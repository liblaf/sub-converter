import { z } from "zod";
import { INBOUND_MIXED } from "./mixed";
import { INBOUND_TUN } from "./tun";

export type { InboundMixed } from "./mixed";
export type { InboundTun } from "./tun";

export const INBOUND = z.discriminatedUnion("type", [
  INBOUND_MIXED,
  INBOUND_TUN,
]);

export type Inbound = z.infer<typeof INBOUND>;
