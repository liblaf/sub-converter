import type { Outbound } from "@/sing-box/types";
import { UnknownUriProtocolError } from "@/utils";
import { singboxFromSS } from "./ss";
import { singboxFromVmess } from "./vmess";

export function singboxFromUri(uri: string): Outbound {
  if (uri.startsWith("ss://")) return singboxFromSS(uri);
  if (uri.startsWith("vmess://")) return singboxFromVmess(uri);
  throw new UnknownUriProtocolError(uri);
}
