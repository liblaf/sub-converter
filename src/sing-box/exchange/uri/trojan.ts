import type { Outbound } from "@/sing-box/types";
import { URIParseError } from "@/utils";

export function singboxFromTrojan(uri: string): Outbound {
  const url = new URL(uri);
  if (url.protocol !== "trojan:") throw new URIParseError("trojan", uri);
  return {
    // https://sing-box.sagernet.org/configuration/outbound/trojan/
    type: "trojan",
    tag: decodeURIComponent(url.hash.slice(1)),
    server: url.hostname,
    server_port: Number.parseInt(url.port),
    password: url.username,
    tls: {
      enabled: true,
      server_name: url.searchParams.get("sni"),
      insecure: url.searchParams.get("allowInsecure") === "1",
    },
  };
}
