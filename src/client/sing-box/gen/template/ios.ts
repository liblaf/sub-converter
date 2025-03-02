import type { InboundTun, Singbox } from "@lib/client/sing-box/schema";
import { InboundTag } from "@lib/const";
import type { GeneratorSingbox, GeneratorSingboxOptions } from "../types";
import { DEFAULT } from "./default";

export const IOS: GeneratorSingbox = {
  generate(
    providers: Map<string, Singbox>,
    options: GeneratorSingboxOptions,
  ): Singbox {
    const singbox: Singbox = DEFAULT.generate(providers, options);
    singbox.inbounds!.push({
      type: "tun",
      tag: InboundTag.TUN,
      address: ["172.18.0.1/30", "fdfe:dcba:9876::1/126"],
      auto_route: true,
      strict_route: true,
    } satisfies InboundTun);
    return singbox;
  },
};
