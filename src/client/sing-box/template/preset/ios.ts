import { DnsTag, InboundTag } from "@/filter";
import type { Config, InboundTun, Outbound } from "../../types";
import { makeDefaultConfig } from "./default";
import type { Template, TemplateOptions } from "./types";

export const makeIosConfig: Template = (
  providers: Map<string, Outbound[]>,
  opts: TemplateOptions,
): Config => {
  const cfg: Config = makeDefaultConfig(providers, opts);
  cfg.dns!.servers = cfg.dns?.servers?.map((server) => {
    if (server.tag === DnsTag.LOCAL) server.address = "8.8.8.8";
    return server;
  });
  cfg.inbounds = [
    {
      type: "tun",
      tag: InboundTag.TUN,
      address: ["172.19.0.1/30", "fdfe:dcba:9876::1/126"],
      auto_route: true,
      strict_route: true,
    } satisfies InboundTun,
  ];
  return cfg;
};
