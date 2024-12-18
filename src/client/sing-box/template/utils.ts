import type { ProxyGroup } from "@/filter";
import { OutboundTag } from "@/filter";
import { SubConverterError } from "@/utils";
import { filterSingboxTags } from "../provider";
import type {
  Config,
  Outbound,
  OutboundSelector,
  OutboundUrltest,
  RuleSetRemote,
} from "../types";

export function addGroup(
  cfg: Config,
  providers: Map<string, Outbound[]>,
  filter: ProxyGroup,
): Config {
  let group: Outbound | undefined = cfg.outbounds!.find(
    (o: Outbound): boolean => o.tag === filter.name,
  );
  if (group === undefined) {
    switch (filter.type) {
      case "selector": {
        group = {
          type: "selector",
          tag: filter.name,
          outbounds: [],
        } satisfies OutboundSelector;
        break;
      }
      case "urltest": {
        group = {
          type: "urltest",
          tag: filter.name,
          outbounds: [],
          url: "https://cp.cloudflare.com",
        } satisfies OutboundUrltest;
        break;
      }
      default: {
        throw new SubConverterError(`Unknown group type: ${filter.type}`);
      }
    }
    cfg.outbounds!.push(group);
  }
  group.outbounds = filterSingboxTags(providers, filter.filter);
  cfg
    .outbounds!.find((o) => o.tag === OutboundTag.PROXY)!
    .outbounds.push(filter.name);
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
  } satisfies RuleSetRemote;
}
