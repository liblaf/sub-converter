import type { RuleSetRemote, Singbox } from "@lib/client/sing-box/schema";
import { OutboundTag } from "@lib/const";

import type { Outbound } from "@lib/client/sing-box/schema";
import * as R from "remeda";
import { getOutbounds } from "../utils";

export function appendNameToOutbounds(
  outbounds: Outbound[],
  name?: string,
): Outbound[] {
  if (!name) return outbounds;
  return outbounds.map((o: Outbound): Outbound => {
    const result: Outbound = R.clone(o);
    if (name) result.tag += ` [${name}]`;
    return result;
  });
}

export function appendNameToTags(tags: string[], name?: string): string[] {
  if (!name) return tags;
  return tags.map((tag: string): string => `${tag} [${name}]`);
}

export function filterSingboxOutbounds(
  providers: Map<string, Singbox>,
  filter?: (tag: string) => boolean,
): Outbound[] {
  const result: Outbound[] = [];
  for (const [name, singbox] of providers) {
    let outbounds: Outbound[] = getOutbounds(singbox);
    if (filter)
      outbounds = outbounds.filter((o: Outbound): boolean => filter(o.tag));
    result.push(...appendNameToOutbounds(outbounds, name));
  }
  return result;
}

export function filterSingboxTags(
  providers: Map<string, Singbox>,
  filter?: (tag: string) => boolean,
): string[] {
  const result: string[] = [];
  for (const [name, singbox] of providers) {
    const outbounds: Outbound[] = getOutbounds(singbox);
    let tags: string[] = outbounds.map((o: Outbound): string => o.tag);
    if (filter) tags = tags.filter(filter);
    result.push(...appendNameToTags(tags, name));
  }
  return result;
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
