import * as R from "remeda";
import type { Outbound, RouteRule, Singbox } from "../schema";

export function sanitize(singbox: Singbox): Singbox {
  let result: Singbox = singbox;
  result = cleanGroupOutbounds(result);
  result = cleanEmptyGroups(result);
  result = cleanGroupOutbounds(result);
  result = cleanRouteRules(result);
  result = ensureCompatibility(result);
  return result;
}

function cleanGroupOutbounds(singbox: Singbox): Singbox {
  if (!singbox.outbounds) return singbox;
  const tags: Set<string> = new Set(
    singbox.outbounds.map((o: Outbound): string => o.tag),
  );
  singbox.outbounds = singbox.outbounds.map((o: Outbound): Outbound => {
    if (o.type !== "selector" && o.type !== "urltest") return o;
    o.outbounds = R.unique(o.outbounds);
    o.outbounds = o.outbounds.filter((tag: string): boolean => tags.has(tag));
    return o;
  });
  return singbox;
}

function cleanEmptyGroups(singbox: Singbox): Singbox {
  if (!singbox.outbounds) return singbox;
  singbox.outbounds = singbox.outbounds.filter((o: Outbound): boolean => {
    if (o.type !== "selector" && o.type !== "urltest") return true;
    return o.outbounds?.length !== 0;
  });
  return singbox;
}

function cleanRouteRules(singbox: Singbox): Singbox {
  if (!singbox.route) return singbox;
  if (!singbox.outbounds) return singbox;
  const outbounds: Set<string> = new Set(
    singbox.outbounds.map((o: Outbound): string => o.tag),
  );
  singbox.route.rules = singbox.route.rules?.filter((r: RouteRule): boolean => {
    if (r.action === "route") return outbounds.has(r.outbound);
    return true;
  });
  return singbox;
}

function ensureCompatibility(singbox: Singbox): Singbox {
  if (!singbox.outbounds) return singbox;
  // TODO: since sing-box 1.12.0
  for (const o of singbox.outbounds) {
    if ("domain_resolver" in o) o.domain_resolver = undefined;
  }
  return singbox;
}
