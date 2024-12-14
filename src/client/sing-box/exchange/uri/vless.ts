import type { Outbound } from "@/client/sing-box/types";
import { URIParseError } from "@/utils";

export function singboxFromVless(uri: string): Outbound {
  const url = new URL(uri);
  if (url.protocol !== "vless:") throw new URIParseError("vless", uri);
  return {
    // https://sing-box.sagernet.org/configuration/outbound/vless/
    type: "vless",
    tag: decodeURIComponent(url.hash.slice(1)),
    server: url.hostname,
    server_port: Number.parseInt(url.port),
    uuid: url.username,
    flow: url.searchParams.get("flow"),
    tls: {
      // https://sing-box.sagernet.org/configuration/shared/tls/#outbound
      enabled: true,
      server_name: url.searchParams.get("sni"),
      insecure: false,
      utls: {
        enabled: true,
        fingerprint: url.searchParams.get("fp"),
      },
      reality: {
        enabled: true,
        public_key: url.searchParams.get("pbk"),
        short_id: url.searchParams.get("sid"),
      },
    },
  };
}
