import {
  type Config,
  type Outbound,
  singboxFromBase64,
} from "@/client/sing-box";
import { fetchUnsafe, jmsSubUrl } from "@/utils";
import type { ProviderOptions } from "../types";

export async function fetchSingboxOutbounds(
  provider: ProviderOptions,
): Promise<Outbound[]> {
  if (provider.singbox) {
    const resp = await fetchUnsafe(provider.singbox.url, {
      headers: { "User-Agent": provider.singbox.ua },
    });
    const cfg: Config = await resp.json();
    return cfg.outbounds ?? [];
  }
  if (provider.base64) {
    const ua: string | undefined = provider.base64.ua;
    const resp: Response = await fetchUnsafe(
      provider.base64.url,
      ua ? { headers: { "User-Agent": ua } } : undefined,
    );
    const base64: string = await resp.text();
    return singboxFromBase64(base64);
  }
  if (provider.jms) {
    const url: URL = jmsSubUrl(provider.jms);
    const resp: Response = await fetchUnsafe(url);
    const base64: string = await resp.text();
    return singboxFromBase64(base64);
  }
  if (provider.uri) {
    const { url, ua } = provider.uri;
    const resp: Response = await fetchUnsafe(
      url,
      ua ? { headers: { "User-Agent": ua } } : undefined,
    );
    const uri: string = await resp.text();
    return singboxFromBase64(uri);
  }
  throw new Error(`Invalid provider: ${provider.name}`);
}
