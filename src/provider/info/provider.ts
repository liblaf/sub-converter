import type { ProviderOptions } from "../types";
import { getProviderUrl } from "../utils";
import { fetchClashInfo } from "./clash";
import { fetchJmsInfo } from "./jms";
import type { SubscriptionUserinfo } from "./types";

export async function fetchProvidersInfo(
  providers: ProviderOptions[],
): Promise<SubscriptionUserinfo[]> {
  const infos: SubscriptionUserinfo[] = await Promise.all(
    providers.map(fetchSubInfoSafe),
  );
  return infos;
}

export async function fetchSubInfoSafe(
  provider: ProviderOptions,
): Promise<SubscriptionUserinfo> {
  try {
    return await fetchSubInfoUnsafe(provider);
  } catch (error) {
    return {
      name: provider.name,
      url: getProviderUrl(provider),
      error: `${error}`,
    };
  }
}

export async function fetchSubInfoUnsafe(
  provider: ProviderOptions,
): Promise<SubscriptionUserinfo> {
  let info: SubscriptionUserinfo = {
    name: provider.name,
    url: getProviderUrl(provider),
  };
  if (provider.clash)
    info = {
      ...info,
      ...(await fetchClashInfo(provider.clash.url, provider.clash.ua)),
    };
  else if (provider.jms)
    info = { ...info, ...(await fetchJmsInfo(provider.jms)) };
  else throw new Error(`Unsupported provider: ${provider.name}`);
  return info;
}
