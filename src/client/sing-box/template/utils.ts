import { OutboundTag, type ProxyFilter } from "@/filter";
import { filterSingboxOutboundTags } from "../provider";
import type { Config, Outbound, RuleSetRemote } from "../types";

export function addGroup(
  cfg: Config,
  providers: Map<string, Outbound[]>,
  filter: ProxyFilter,
): Config {
  let group: Outbound | undefined = cfg.outbounds?.find(
    (o: Outbound): boolean => o.tag === filter.name,
  );
  if (group === undefined) {
    group = {
      type: "urltest",
      tag: filter.name,
      outbounds: [],
      url: "https://cp.cloudflare.com",
    };
    cfg.outbounds?.push(group);
  }
  group.outbounds = filterSingboxOutboundTags(providers, filter.filter);
  cfg.outbounds
    ?.find((o) => o.tag === OutboundTag.PROXY)
    ?.outbounds?.push(filter.name);
  return cfg;
}

export function makeRemoteRuleset(
  type: "geoip" | "geosite" | "rule-set",
  name: string,
): RuleSetRemote {
  return {
    type: "remote",
    tag: `${type}:${name}`,
    format: "binary",
    url: `https://api.liblaf.me/rules/sing/${type}/${name}.srs`,
    download_detour: OutboundTag.DIRECT,
  };
}
