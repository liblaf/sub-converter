import type { ListenFields } from "../shared";

export type InboundMixed = {
  type: "mixed";
  tag?: string;

  users?: { username: string; password: string }[];
  set_system_proxy?: boolean;
} & ListenFields;

export function defineInboundMixed(
  mixed: Partial<InboundMixed> = {},
): InboundMixed {
  return {
    type: "mixed",
    tag: "in:mixed",
    listen: "0.0.0.0",
    listen_port: 64393,
    ...mixed,
  };
}
