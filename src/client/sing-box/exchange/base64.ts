import { tryDecodeBase64 } from "@/utils";
import type { Outbound } from "../types";
import { singboxFromUri } from "./uri";

export function singboxFromBase64(base64: string): Outbound[] {
  const uri = tryDecodeBase64(base64)
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s);
  return uri.map(singboxFromUri);
}
