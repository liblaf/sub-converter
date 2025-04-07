import { InboundTag } from "@lib/const";
import type { ProviderOutbound } from "@lib/outbound";
import type { InboundTun, Singbox } from "@lib/schema";
import type { Template, TemplateOptions } from "../typed";
import { DEFAULT } from "./default";

export const IOS: Template = {
  generate(outbounds: ProviderOutbound[], options: TemplateOptions): Singbox {
    const singbox: Singbox = DEFAULT.generate(outbounds, options);
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
