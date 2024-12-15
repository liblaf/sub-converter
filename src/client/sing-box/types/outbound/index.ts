export type { OutboundSelector } from "./selector";
export type { OutboundUrltest } from "./urltest";

import type { OutboundSelector } from "./selector";
import type { OutboundUrltest } from "./urltest";

export type Outbound =
  | {
      // https://sing-box.sagernet.org/configuration/outbound/
      type: string;
      tag: string;
      [key: string]: any;
    }
  | OutboundSelector
  | OutboundUrltest;
