import { renameTag } from "@/filter";
import type { Profile, ProviderOptions } from "@/provider";
import { InvalidProviderError, jmsSubUrl, subconvert } from "@/utils";
import { fetchUnsafe, newLogger } from "@liblaf/utils";
import { singboxFromBase64 } from "../exchange";
import type { Config, Outbound } from "../types";

const OUTBOUND_EXCLUDE_TYPES = new Set([
  "direct",
  "block",
  "dns",
  "selector",
  "urltest",
]);

const logger = newLogger();

export async function fetchSingboxOutboundsFromProfile({
  providers,
}: Profile): Promise<Map<string, Outbound[]>> {
  const result: Map<string, Outbound[]> = new Map();
  await Promise.all(
    providers.map(async (provider: ProviderOptions) => {
      const outbounds: Outbound[] =
        await fetchSingboxOutboundsFromProvider(provider);
      result.set(provider.name, outbounds);
    }),
  );
  return result;
}

export async function fetchSingboxOutboundsFromProvider(
  provider: ProviderOptions,
): Promise<Outbound[]> {
  let outbounds: Outbound[] = [];
  try {
    outbounds = await fetchSingboxOutboundsDirect(provider);
  } catch {
    outbounds = await fetchSingboxOutboundsProxy(provider);
  }
  outbounds = outbounds.filter(
    (o: Outbound): boolean => !OUTBOUND_EXCLUDE_TYPES.has(o.type),
  );
  outbounds = outbounds.map((o: Outbound): Outbound => {
    o.tag = renameTag(o.tag);
    return o;
  });
  return outbounds;
}

async function fetchSingboxOutboundsDirect(
  provider: ProviderOptions,
): Promise<Outbound[]> {
  if (provider.singbox) {
    logger.info(`Fetching ${provider.name} from sing-box URL`);
    const resp = await fetchUnsafe(provider.singbox.url, {
      headers: {
        "User-Agent": provider.singbox.ua,
      },
    });
    const cfg: Config = await resp.json();
    return cfg.outbounds ?? [];
  }
  if (provider.base64) {
    logger.info(`Fetching ${provider.name} from Base64 URL`);
    const ua: string | undefined = provider.base64.ua;
    const resp: Response = await fetchUnsafe(
      provider.base64.url,
      ua ? { headers: { "User-Agent": ua } } : undefined,
    );
    const base64: string = await resp.text();
    return singboxFromBase64(base64);
  }
  if (provider.uri) {
    logger.info(`Fetching ${provider.name} from URI URL`);
    const { url, ua } = provider.uri;
    const resp: Response = await fetchUnsafe(
      url,
      ua ? { headers: { "User-Agent": ua } } : undefined,
    );
    const uri: string = await resp.text();
    return singboxFromBase64(uri);
  }
  if (provider.jms) {
    logger.info(`Fetching ${provider.name} from JMS URL`);
    const url: URL = jmsSubUrl(provider.jms);
    const resp: Response = await fetchUnsafe(url);
    const base64: string = await resp.text();
    return singboxFromBase64(base64);
  }
  throw new InvalidProviderError(provider);
}

async function fetchSingboxOutboundsProxy(
  provider: ProviderOptions,
): Promise<Outbound[]> {
  if (provider.singbox) {
    logger.info(`Converting ${provider.name} from sing-box URL`);
    return await subconvertSingbox(provider.singbox.url);
  }
  if (provider.clash) {
    logger.info(`Converting ${provider.name} from Clash URL`);
    return await subconvertSingbox(provider.clash.url);
  }
  if (provider.base64) {
    logger.info(`Converting ${provider.name} from Base64 URL`);
    return await subconvertSingbox(provider.base64.url);
  }
  if (provider.uri) {
    logger.info(`Converting ${provider.name} from URI URL`);
    return await subconvertSingbox(provider.uri.url);
  }
  if (provider.jms) {
    logger.info(`Converting ${provider.name} from JMS URL`);
    return await subconvertSingbox(jmsSubUrl(provider.jms).href);
  }
  throw new InvalidProviderError(provider);
}

async function subconvertSingbox(url: string): Promise<Outbound[]> {
  const text: string = await subconvert("singbox", url);
  const cfg: Config = JSON.parse(text);
  return cfg.outbounds ?? [];
}
