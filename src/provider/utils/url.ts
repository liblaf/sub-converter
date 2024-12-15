import { jmsSubUrl } from "@/utils";
import type { ProviderOptions } from "../types";

export function getProviderUrl(provider: ProviderOptions): string | undefined {
  if (provider.singbox) return provider.singbox.url;
  if (provider.clash) return provider.clash.url;
  if (provider.base64) return provider.base64.url;
  if (provider.uri) return provider.uri.url;
  if (provider.jms) return jmsSubUrl(provider.jms).href;
  return undefined;
}
