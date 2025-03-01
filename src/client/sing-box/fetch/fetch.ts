import type { Singbox } from "@lib/client/sing-box";
import type { Provider } from "@lib/provider";
import { fetchWithUA } from "@lib/utils";

export const SINGBOX_OUTBOUND_TYPE_EXCLUDE = new Set([
  "block",
  "direct",
  "dns",
  "selector",
  "urltest",
]);

export async function fetchSingboxFromUrl(
  url: string,
  ua = "sing-box",
): Promise<Singbox> {
  const resp: Response = await fetchWithUA(url, ua);
  const json: any = await resp.json();
  // TODO: validate json
  // const cfg: Singbox = SINGBOX_SCHEMA.parse(json);
  const cfg: Singbox = json;
  return cfg;
}

export async function fetchSingboxFromProvider({
  "sing-box": singbox,
}: Provider): Promise<Singbox> {
  return await fetchSingboxFromUrl(singbox!.url, singbox!.ua);
}

export async function fetchSingboxFromProviders(
  providers: Provider[],
): Promise<Map<string, Singbox>> {
  return new Map(
    await Promise.all(
      providers.map(
        async (provider: Provider): Promise<[string, Singbox]> => [
          provider.name,
          await fetchSingboxFromProvider(provider),
        ],
      ),
    ),
  );
}
