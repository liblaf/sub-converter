import { tryDecodeBase64 } from "@/utils/base64";
import type { Outbound } from "../types";
import { singboxFromUri } from "./uri";

export function singboxFromBase64(base64: string): Outbound[] {
  const uris = tryDecodeBase64(base64)
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
  return uris.map(singboxFromUri);
}
