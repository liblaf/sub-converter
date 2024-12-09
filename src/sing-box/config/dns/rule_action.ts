export type DNSRuleActionRoute = {
  action?: "route";
  server: string;
  disable_cache?: boolean;
  rewrite_ttl?: number;
  client_subnet?: string;
};

export type DNSRuleActionRouteOptions = {
  action: "route-options";
  disable_cache?: boolean;
  rewrite_ttl?: number;
  client_subnet?: string;
};

export type DNSRuleActionReject = {
  action: "reject";
  method?: "default" | "drop";
  no_drop?: boolean;
};

export type DNSRuleAction =
  | DNSRuleActionRoute
  | DNSRuleActionRouteOptions
  | DNSRuleActionReject;
