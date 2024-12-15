import type { Outbound } from "@/client/sing-box/types";
import { UnknownUriProtocolError } from "@/utils";
import { singboxFromSs } from "./ss";
import { singboxFromTrojan } from "./trojan";
import { singboxFromVless } from "./vless";
import { singboxFromVmess } from "./vmess";

export function singboxFromUri(uri: string): Outbound {
  if (uri.startsWith("ss://")) return singboxFromSs(uri);
  if (uri.startsWith("trojan://")) return singboxFromTrojan(uri);
  if (uri.startsWith("vless://")) return singboxFromVless(uri);
  if (uri.startsWith("vmess://")) return singboxFromVmess(uri);
  throw new UnknownUriProtocolError(uri);
}

export function singboxFromUriList(text: string): Outbound[] {
  const uri: string[] = text
    .split("\n")
    .map((s: string): string => s.trim())
    .filter((s: string): boolean => !!s);
  return uri.map(singboxFromUri);
}
