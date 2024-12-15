import type { ListenFields } from "../shared";

export type InboundMixed = {
  // https://sing-box.sagernet.org/configuration/inbound/mixed/
  type: "mixed";
  tag: string;
} & ListenFields;
