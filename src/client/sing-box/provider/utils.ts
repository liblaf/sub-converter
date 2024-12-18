import * as R from "remeda";
import type { Outbound } from "../types";

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
  providers: Map<string, Outbound[]>,
  filter?: (tag: string) => boolean,
): Outbound[] {
  const result: Outbound[] = [];
  for (const [name, outbounds] of providers) {
    let outs: Outbound[] = outbounds;
    if (filter) outs = outs.filter((o: Outbound): boolean => filter(o.tag));
    result.push(...appendNameToOutbounds(outs, name));
  }
  return result;
}

export function filterSingboxTags(
  providers: Map<string, Outbound[]>,
  filter?: (tag: string) => boolean,
): string[] {
  const result: string[] = [];
  for (const [name, outbounds] of providers) {
    let outs: string[] = outbounds.map((o: Outbound): string => o.tag);
    if (filter) outs = outs.filter(filter);
    result.push(...appendNameToTags(outs, name));
  }
  return result;
}
