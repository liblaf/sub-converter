import type { ProviderOutbound } from "@lib/outbound";

export type Group = {
  type: "selector" | "urltest";
  name: string;
  filter(outbound: ProviderOutbound): boolean;
};
