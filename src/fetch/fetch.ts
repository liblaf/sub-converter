import { ProviderOutbound } from "@/src/outbound";
import type { Provider } from "@lib/provider";
import type { Outbound, Singbox } from "@lib/schema";
import { fetchWithUA, getLogger } from "@lib/utils";

const logger = getLogger();

export async function fetchSingbox(
  providers: Provider[],
): Promise<ProviderOutbound[]> {
  const nodes: ProviderOutbound[][] = await Promise.all(
    providers.map(fetchSingboxFromProvider),
  );
  return nodes.flat();
}

async function fetchSingboxFromProvider(
  p: Provider,
): Promise<ProviderOutbound[]> {
  if (p.singbox) {
    try {
      const singbox: Singbox = await fetchSingboxFromUrl(
        p.singbox.url,
        p.singbox.ua,
      );
      const outbounds: Outbound[] = singbox.outbounds ?? [];
      return outbounds.map(
        (outbound: Outbound): ProviderOutbound =>
          new ProviderOutbound(p, outbound),
      );
    } catch (err) {
      console.error(`${p.name}: ${err}`);
      return [];
    }
  }
  logger.warn(`Provider ${p.name} does not have a Singbox URL. Skipping...`);
  return [];
}

async function fetchSingboxFromUrl(
  url: string,
  ua = "sing-box",
): Promise<Singbox> {
  const resp: Response = await fetchWithUA(url, ua);
  const singbox: Singbox = await resp.json();
  return singbox;
}
