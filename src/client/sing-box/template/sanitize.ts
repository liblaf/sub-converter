import type { Config, Outbound } from "../types";

export function sanitize(cfg: Config): Config {
  let result: Config = cfg;
  result = cleanGroupOutbounds(result);
  result = cleanEmptyGroups(result);
  result = cleanGroupOutbounds(result);
  result = cleanRouteRules(result);
  return result;
}

function cleanGroupOutbounds(cfg: Config): Config {
  if (!cfg.outbounds) return cfg;
  const outbounds: Set<string> = new Set(
    cfg.outbounds.map((o: Outbound): string => o.tag),
  );
  cfg.outbounds = cfg.outbounds.map((o: Outbound): Outbound => {
    if (o.type !== "selector" && o.type !== "urltest") return o;
    o.outbounds = o.outbounds.filter((tag: string): boolean =>
      outbounds.has(tag),
    );
    return o;
  });
  return cfg;
}

function cleanEmptyGroups(cfg: Config): Config {
  if (!cfg.outbounds) return cfg;
  cfg.outbounds = cfg.outbounds.filter((o: Outbound): boolean => {
    if (o.type !== "selector" && o.type !== "urltest") return true;
    return o.outbounds?.length !== 0;
  });
  return cfg;
}

function cleanRouteRules(cfg: Config): Config {
  if (!cfg.route) return cfg;
  if (!cfg.outbounds) return cfg;
  const outbounds: Set<string> = new Set(
    cfg.outbounds.map((o: Outbound): string => o.tag),
  );
  cfg.route.rules = cfg.route.rules?.filter((r): boolean =>
    outbounds.has(r.outbound),
  );
  return cfg;
}
