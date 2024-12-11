import type { Outbound } from "@/sing-box/types";
import { URIParseError, decodeBase64 } from "@/utils";

export function singboxFromSS(uri: string): Outbound {
  // https://github.com/shadowsocks/shadowsocks-org/wiki/SIP002-URI-Scheme
  let match = uri.match(/ss:\/\/(?<body>.+)#(?<tag>.+)/);
  if (!match) throw new URIParseError("ss", uri);
  let { body, tag } = match.groups!;
  body = decodeBase64(body);
  tag = decodeURIComponent(tag);
  match = body.match(/(?<userinfo>.+)@(?<hostname>.+):(?<port>\d+)/);
  if (!match) throw new URIParseError("ss", uri);
  let { userinfo, hostname, port } = match.groups!;
  userinfo = decodeBase64(userinfo);
  match = userinfo.match(/(?<method>.+):(?<password>.+)/);
  if (!match) throw new URIParseError("ss", uri);
  let { method, password } = match.groups!;
  password = decodeURIComponent(password);
  return {
    type: "shadowsocks",
    tag,
    server: hostname,
    server_port: Number.parseInt(port),
    method,
    password,
  };
}
