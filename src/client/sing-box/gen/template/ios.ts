import type {
  InboundMixed,
  InboundTun,
  Singbox,
} from "@lib/client/sing-box/schema";
import { InboundTag } from "@lib/const";
import type { GeneratorSingbox, GeneratorSingboxOptions } from "../types";
import { findInbound } from "../utils";
import { DEFAULT } from "./default";

export const IOS: GeneratorSingbox = {
  generate(
    providers: Map<string, Singbox>,
    options: GeneratorSingboxOptions,
  ): Singbox {
    const singbox: Singbox = DEFAULT.generate(providers, options);
    const inMixed = findInbound(singbox, InboundTag.MIXED) as InboundMixed;
    singbox.inbounds!.push({
      type: "tun",
      tag: InboundTag.TUN,
      address: ["172.18.0.1/30", "fdfe:dcba:9876::1/126"],
      auto_route: true,
      strict_route: true,
      platform: {
        http_proxy: {
          enabled: true,
          server: "127.0.0.1",
          server_port: inMixed.listen_port,
        },
      },
    } satisfies InboundTun);
    return singbox;
  },
};
