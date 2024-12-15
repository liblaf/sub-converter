import type { ProviderOptions } from "@/provider";
import { getProviderUrl } from "@/provider";
import { SubConverterError } from "@/utils/errors";
import { fetchClashInfo, fetchJmsInfo } from "./fetch";
import type { SubscriptionUserinfo } from "./types";

class FetchInfoError extends SubConverterError {
  readonly name: string = "FetchInfoError";
  constructor(readonly provider: string) {
    super(`Failed to fetch info from provider: ${provider}`);
  }
}

export async function fetchAllInfo(
  providers: ProviderOptions[],
): Promise<SubscriptionUserinfo[]> {
  const infos: SubscriptionUserinfo[] = await Promise.all(
    providers.map(fetchInfoSafe),
  );
  return infos;
}

export async function fetchInfoSafe(
  provider: ProviderOptions,
): Promise<SubscriptionUserinfo> {
  try {
    return await fetchInfo(provider);
  } catch (error) {
    return {
      name: provider.name,
      url: getProviderUrl(provider),
      error: `${error}`,
    };
  }
}

export async function fetchInfo(
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
  else throw new FetchInfoError(provider.name);
  return info;
}
