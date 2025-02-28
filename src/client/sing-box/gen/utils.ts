import type { ProxyGroup } from "@lib/group";
import type {
  Inbound,
  Outbound,
  OutboundSelector,
  OutboundUrltest,
  Singbox,
} from "../schema";

export function findInbound(
  singbox: Singbox,
  tag: string,
): Inbound | undefined {
  return singbox.inbounds?.find((i: Inbound): boolean => i.tag === tag);
}

export function findOutbound(
  singbox: Singbox,
  tag: string,
): Outbound | undefined {
  return singbox.outbounds?.find((o: Outbound): boolean => o.tag === tag);
}

export const OUTBOUND_TYPE_EXCLUDE = new Set([
  "block",
  "direct",
  "dns",
  "selector",
  "urltest",
]);

export function getOutbounds(singbox: Singbox): Outbound[] {
  let outbounds: Outbound[] = singbox.outbounds ?? [];
  outbounds = outbounds.filter(
    (o: Outbound): boolean => !OUTBOUND_TYPE_EXCLUDE.has(o.type),
  );
  return outbounds;
}

export function findOrCreateGroup(
  singbox: Singbox,
  group: ProxyGroup,
): OutboundSelector | OutboundUrltest {
  const outbounds: Outbound[] = singbox.outbounds ?? [];
  let outbound: Outbound | undefined = outbounds.find(
    (o: Outbound): boolean => o.tag === group.name,
  );
  if (outbound) return outbound as OutboundSelector | OutboundUrltest;
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
