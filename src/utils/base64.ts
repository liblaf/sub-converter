import { Base64 } from "js-base64";

export function tryDecodeBase64(s: string): string {
  if (Base64.isValid(s)) {
    return Base64.decode(s);
  }
  return s;
}
