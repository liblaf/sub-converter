import { ProviderOutbound } from "@/src/outbound";
import type { Provider } from "@lib/provider";
import type { Outbound } from "@lib/schema";
import { getLogger } from "@lib/utils";
import { fetchSingboxFromJms } from "./jms";
import { fetchSingboxFromSingbox } from "./sing-box";

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
  let outbounds: Outbound[] = [];
  try {
    if (p.singbox) {
      outbounds = await fetchSingboxFromSingbox(p);
    } else if (p.jms) {
      outbounds = await fetchSingboxFromJms(p);
    } else {
      logger.warn(
        `Provider ${p.name} does not have a Singbox URL. Skipping...`,
      );
    }
  } catch (err) {
    logger.error(`${p.name}: ${err}`);
  }
  return outbounds
    .map((o: Outbound): ProviderOutbound => new ProviderOutbound(p, o))
    .filter((o: ProviderOutbound): boolean => !(o.dummy || o.info));
}
