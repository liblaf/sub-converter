import type { ListenFields } from "../shared";

export type InboundTun = {
  type: "tun";
  tag?: string;

  // TODO: add more fields
  address?: string[];
  auto_route?: boolean;
  strict_route?: boolean;
} & Omit<ListenFields, "listen">;

export function defineInboundTun(tun: Partial<InboundTun> = {}): InboundTun {
  return {
    type: "tun",
    tag: "in:tun",
    address: ["172.19.0.1/30", "fdfe:dcba:9876::1/126"],
    auto_route: true,
    strict_route: false,
    ...tun,
  };
}
