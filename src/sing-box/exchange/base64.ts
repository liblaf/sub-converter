import { tryDecodeBase64 } from "@/utils/base64";
import type { Outbound } from "../types";
import { singboxFromUri } from "./uri";

export function singboxFromBase64(base64: string): Outbound[] {
  const uris = tryDecodeBase64(base64)
    .split("\n")
    .filter((s) => s.trim());
  return uris.map(singboxFromUri);
}
