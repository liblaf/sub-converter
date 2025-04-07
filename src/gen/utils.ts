import { OutboundTag } from "@lib/const";
import type { Group } from "@lib/group";
import type { ProviderOutbound } from "@lib/outbound";
import type {
  Inbound,
  Outbound,
  OutboundGroup,
  OutboundSelector,
  OutboundUrltest,
  RuleSetRemote,
  Singbox,
} from "@lib/schema";

export function filterSingboxOutbounds(
  outbounds: ProviderOutbound[],
  filter?: (outbound: ProviderOutbound) => boolean,
): Outbound[] {
  const filteredOutbounds: ProviderOutbound[] = filter
    ? outbounds.filter(filter)
    : outbounds;
  const results: Outbound[] = filteredOutbounds.map(
    (o: ProviderOutbound): Outbound => o.outbound,
  );
  return results;
}

export function filterSingboxTags(
  outbounds: ProviderOutbound[],
  filter?: (outbound: ProviderOutbound) => boolean,
): string[] {
  const filteredOutbounds: Outbound[] = filterSingboxOutbounds(
    outbounds,
    filter,
  );
  const results: string[] = filteredOutbounds.map(
    (o: Outbound): string => o.tag,
  );
  return results;
}

export function findInbound(
  singbox: Singbox,
  tag: string,
): Inbound | undefined {
  return singbox.inbounds?.find((i: Inbound): boolean => i.tag === tag);
}

export function findOrCreateGroup(
  singbox: Singbox,
  group: Group,
): OutboundGroup {
  const outbounds: Outbound[] = singbox.outbounds ?? [];
  let outbound: Outbound | undefined = outbounds.find(
    (o: Outbound): boolean => o.tag === group.name,
  );
  if (outbound) return outbound as OutboundGroup;
  switch (group.type) {
    case "selector": {
      outbound = {
        type: "selector",
        tag: group.name,
        outbounds: [],
      } satisfies OutboundSelector;
      break;
    }
    case "urltest": {
      outbound = {
        type: "urltest",
        tag: group.name,
        outbounds: [],
        url: "https://cp.cloudflare.com",
      } satisfies OutboundUrltest;
      break;
    }
  }
  outbounds.push(outbound);
  return outbound;
}

export function findOutbound(
  singbox: Singbox,
  tag: string,
): Outbound | undefined {
  return singbox.outbounds?.find((o: Outbound): boolean => o.tag === tag);
}

export function makeRemoteRuleSet(
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
