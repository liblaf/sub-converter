import type { SubscriptionUserinfo } from "@/info";
import { fetchClashInfo } from "@/info/fetch";
import { fetchUnsafe } from "@liblaf/utils";

export async function subconvert(
  target: string,
  url: string,
  backend = "https://url.v1.mk/sub",
): Promise<string> {
  const req: URL = makeSubconvertUrl(target, url, backend);
  const resp = await fetchUnsafe(req);
  const text = await resp.text();
  return text;
}

export async function subconvertInfo(
  target: string,
  url: string,
  backend = "https://url.v1.mk/sub",
): Promise<SubscriptionUserinfo> {
  const req: URL = makeSubconvertUrl(target, url, backend);
  return await fetchClashInfo({ url: req.href });
}

function makeSubconvertUrl(
  target: string,
  url: string,
  backend = "https://url.v1.mk/sub",
): URL {
  const req = new URL(backend);
  req.searchParams.set("target", target);
  req.searchParams.set("url", url);
  req.searchParams.set("exclude", "$^");
  req.searchParams.set("add_emoji", "false");
  req.searchParams.set("remove_emoji", "false");
  req.searchParams.set("list", "true");
  return req;
}
