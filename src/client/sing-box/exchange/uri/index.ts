import type { Outbound } from "@/client/sing-box/types";
import { UnknownUriProtocolError } from "@/utils";
import { singboxFromSS } from "./ss";
import { singboxFromTrojan } from "./trojan";
import { singboxFromVless } from "./vless";
import { singboxFromVmess } from "./vmess";

export function singboxFromUri(uri: string): Outbound {
  if (uri.startsWith("ss://")) return singboxFromSS(uri);
  if (uri.startsWith("trojan://")) return singboxFromTrojan(uri);
  if (uri.startsWith("vless://")) return singboxFromVless(uri);
  if (uri.startsWith("vmess://")) return singboxFromVmess(uri);
  throw new UnknownUriProtocolError(uri);
}
