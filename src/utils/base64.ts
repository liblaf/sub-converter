import { Base64 } from "js-base64";

export function tryDecodeBase64(base64: string): string {
  if (Base64.isValid(base64)) return Base64.decode(base64);
  return base64;
}
