import type { Provider, ProviderSingbox } from "@lib/provider";
import type { Outbound, Singbox } from "../schema";
import { fetchWithUA } from "../utils";

export async function fetchSingboxFromSingbox(
  provider: Provider,
): Promise<Outbound[]> {
  const p: ProviderSingbox = provider.singbox!;
  const resp: Response = await fetchWithUA(p.url, p.ua);
  const singbox: Singbox = await resp.json();
  return singbox.outbounds ?? [];
}
