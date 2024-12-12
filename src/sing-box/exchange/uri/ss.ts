import type { Outbound } from "@/sing-box/types";
import { URIParseError, tryDecodeBase64 } from "@/utils";

export function singboxFromSS(uri: string): Outbound {
  // https://github.com/shadowsocks/shadowsocks-org/wiki/SIP002-URI-Scheme
  const match = uri.match(/ss:\/\/(?<body>.+)#(?<tag>.+)/);
  if (!match) throw new URIParseError("ss", uri);
  const { body, tag } = match.groups!;
  const outbound: Outbound = {
    type: "shadowsocks",
    tag,
    ...parseBody(body, uri),
  };
  return outbound;
}

function parseBody(body: string, uri: string): any {
  const bodyDecode = tryDecodeBase64(body);
  const match = bodyDecode.match(
    /(?<userinfo>.+)@(?<hostname>.+):(?<port>\d+)(\/)?(\?(?<plugin>.+))?/,
  );
  if (!match) throw new URIParseError("ss", uri);
  const { userinfo, hostname, port, plugin } = match.groups!;
  return {
    server: hostname,
    server_port: Number.parseInt(port),
    ...parseUserinfo(userinfo, uri),
    ...parsePlugin(plugin),
  };
}

function parseUserinfo(userinfo: string, uri: string): any {
  const userinfoDecode = tryDecodeBase64(userinfo);
  const match = userinfoDecode.match(/(?<method>.+):(?<password>.+)/);
  if (!match) throw new URIParseError("ss", uri);
  let { method, password } = match.groups!;
  password = decodeURIComponent(password);
  return { method, password };
}

function parsePlugin(plugin: string): any {
  if (!plugin) return {};
  const pluginDecode = decodeURIComponent(plugin);
  const outbound: any = {};
  for (const rawPart of pluginDecode.split(";")) {
    const part = rawPart.trim();
    const [key, value] = part.split("=").map((s) => s.trim());
    switch (key) {
      case "plugin":
        outbound.plugin = value;
        break;
      default:
        outbound.plugin_opts = part;
        break;
    }
  }
  return outbound;
}
