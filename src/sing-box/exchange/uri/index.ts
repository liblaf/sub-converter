import type { Outbound } from "@/sing-box/types";
import { UnknownProtocolError } from "@/utils";
import { singboxFromSS } from "./ss";
import { singboxFromVmess } from "./vmess";

export function singboxFromUri(uri: string): Outbound {
  if (uri.startsWith("ss://")) return singboxFromSS(uri);
  if (uri.startsWith("vmess://")) return singboxFromVmess(uri);
  throw new UnknownProtocolError(uri);
}
