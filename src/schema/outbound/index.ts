import { z } from "zod";
import { OUTBOUND_DIRECT } from "./direct";
import { OUTBOUND_SELECTOR, type OutboundSelector } from "./selector";
import { OUTBOUND_URLTEST, type OutboundUrltest } from "./urltest";

export type { OutboundDirect } from "./direct";
export type { OutboundSelector } from "./selector";
export type { OutboundUrltest } from "./urltest";

export const OUTBOUND = z.discriminatedUnion("type", [
  OUTBOUND_DIRECT,
  OUTBOUND_SELECTOR,
  OUTBOUND_URLTEST,
]);
export type Outbound = z.infer<typeof OUTBOUND>;

export type OutboundGroup = OutboundSelector | OutboundUrltest;
