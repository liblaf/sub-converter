import type { Outbound, Singbox } from "@lib/schema";

export function parseSingbox(text: string): Outbound[] {
  const singbox: Singbox = JSON.parse(text);
  return singbox.outbounds ?? [];
}
