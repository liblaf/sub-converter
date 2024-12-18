import type { ProviderOptions } from "@/provider";
import { getProviderUrl } from "@/provider";
import { subconvertInfo } from "@/utils";
import { SubConverterError } from "@/utils/errors";
import inspect from "loupe";
import * as R from "remeda";
import { fetchClashInfo, fetchJmsInfo } from "./fetch";
import type { SubscriptionUserinfo } from "./types";
class FetchInfoError extends SubConverterError {
  name = "FetchInfoError";
  constructor(
    readonly provider: string,
    options?: { cause?: unknown },
  ) {
    super(`Failed to fetch info from provider: ${provider}`, options);
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
      error: inspect(error),
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
  try {
    info = R.merge(info, await fetchInfoDirect(provider));
  } catch (error) {
    info = R.merge(info, await fetchInfoProxy(provider));
  }
  return info;
}

async function fetchInfoDirect(
  provider: ProviderOptions,
): Promise<SubscriptionUserinfo> {
  if (provider.clash) return fetchClashInfo(provider.clash);
  if (provider.singbox) return fetchClashInfo(provider.singbox);
  if (provider.jms) return fetchJmsInfo(provider.jms);
  if (provider.base64) return fetchClashInfo(provider.base64);
  if (provider.uri) return fetchClashInfo(provider.uri);
  throw new FetchInfoError(provider.name);
}

async function fetchInfoProxy(
  provider: ProviderOptions,
): Promise<SubscriptionUserinfo> {
  if (provider.clash) return subconvertInfo("clash", provider.clash.url);
  if (provider.singbox) return subconvertInfo("singbox", provider.singbox.url);
  if (provider.base64) return subconvertInfo("base64", provider.base64.url);
  if (provider.uri) return subconvertInfo("uri", provider.uri.url);
  throw new FetchInfoError(provider.name);
}
