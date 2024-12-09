export type DNSServer = {
  tag?: string;
  address: string;
  address_resolver?: string;
  address_strategy?: "prefer_ipv4" | "prefer_ipv6" | "ipv4_only" | "ipv6_only";
  strategy?: "prefer_ipv4" | "prefer_ipv6" | "ipv4_only" | "ipv6_only";
  detour?: string;
  client_subnet?: string;
};
