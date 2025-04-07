import type { Provider, ProviderJms } from "../provider";
import type { Outbound, Singbox } from "../schema";
import { subconvert } from "./utils";

export async function fetchSingboxFromJms(
  provider: Provider,
): Promise<Outbound[]> {
  const p: ProviderJms = provider.jms!;
  const text: string = await subconvert(p.url, p.ua);
  const singbox: Singbox = JSON.parse(text);
  const outbounds: Outbound[] = singbox.outbounds ?? [];
  for (const outbound of outbounds) {
    const match = outbound.tag.match(/@(?<name>[\w-]+)/);
    if (match) {
      const result: string = match.groups?.name ?? outbound.tag;
      outbound.tag = result;
    }
  }
  return outbounds;
}
