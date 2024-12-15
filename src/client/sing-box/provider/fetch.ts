import { renameTag } from "@/filter";
import type { ProviderOptions } from "@/provider";
import { fetchUnsafe, jmsSubUrl } from "@/utils";
import { singboxFromBase64 } from "../exchange";
import type { Config, Outbound } from "../types";

export async function fetchSingboxProviders(
  providers: ProviderOptions[],
): Promise<Map<string, Outbound[]>> {
  const result: Map<string, Outbound[]> = new Map();
  await Promise.all(
    providers.map(async (provider: ProviderOptions) => {
      const outbounds: Outbound[] = await fetchSingboxOutbounds(provider);
      result.set(provider.name, outbounds);
    }),
  );
  return result;
}

export async function fetchSingboxOutbounds(
  provider: ProviderOptions,
): Promise<Outbound[]> {
  let outbounds: Outbound[] = [];
  if (provider.singbox) {
    const resp = await fetchUnsafe(provider.singbox.url, {
      headers: {
        "User-Agent": provider.singbox.ua,
      },
    });
    const cfg: Config = await resp.json();
    outbounds = cfg.outbounds ?? [];
  } else if (provider.base64) {
    const ua: string | undefined = provider.base64.ua;
    const resp: Response = await fetchUnsafe(
      provider.base64.url,
      ua ? { headers: { "User-Agent": ua } } : undefined,
    );
    const base64: string = await resp.text();
    outbounds = singboxFromBase64(base64);
  } else if (provider.jms) {
    const url: URL = jmsSubUrl(provider.jms);
    const resp: Response = await fetchUnsafe(url);
    const base64: string = await resp.text();
    outbounds = singboxFromBase64(base64);
  } else if (provider.uri) {
    const { url, ua } = provider.uri;
    const resp: Response = await fetchUnsafe(
      url,
      ua ? { headers: { "User-Agent": ua } } : undefined,
    );
    const uri: string = await resp.text();
    outbounds = singboxFromBase64(uri);
  } else {
    throw new Error(`Invalid provider: ${provider.name}`);
  }
  outbounds = outbounds.map((o: Outbound): Outbound => {
    o.tag = renameTag(o.tag);
    return o;
  });
  return outbounds;
}
