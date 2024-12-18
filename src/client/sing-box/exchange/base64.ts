import { tryDecodeBase64 } from "@liblaf/utils";
import type { Outbound } from "../types";
import { singboxFromUriList } from "./uri";

export function singboxFromBase64(base64: string): Outbound[] {
  const uri: string = tryDecodeBase64(base64);
  return singboxFromUriList(uri);
}
