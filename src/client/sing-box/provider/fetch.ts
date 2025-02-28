import type { Provider } from "@lib/provider";
import { fetchWithUA } from "@lib/utils";
import type { Outbound, Singbox } from "@liblaf/sing-box-schema";

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
): Promise<Outbound[]> {
  const resp: Response = await fetchWithUA(url, ua);
  const json: any = await resp.json();
  // TODO: validate json
  // const cfg: Singbox = SINGBOX.parse(json);
  const cfg: Singbox = json;
  let outbounds: Outbound[] = cfg.outbounds ?? [];
  outbounds = outbounds.filter(
    (o: Outbound): boolean => !SINGBOX_OUTBOUND_TYPE_EXCLUDE.has(o.type),
  );
  return outbounds;
}

export async function fetchSingboxFromProvider({
  "sing-box": singbox,
}: Provider): Promise<Outbound[]> {
  return await fetchSingboxFromUrl(singbox!.url, singbox!.ua);
}

export async function fetchSingboxFromProviders(
  providers: Provider[],
): Promise<Map<string, Outbound[]>> {
  return new Map(
    await Promise.all(
      providers.map(
        async (provider: Provider): Promise<[string, Outbound[]]> => [
          provider.name,
          await fetchSingboxFromProvider(provider),
        ],
      ),
    ),
  );
}
