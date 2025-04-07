import { fetchWithUA } from "../utils";

export async function subconvert(url: string, ua?: string): Promise<string> {
  const req = new URL("https://url.v1.mk/sub");
  req.searchParams.set("add_emoji", "false");
  req.searchParams.set("exclude", "$^");
  req.searchParams.set("list", "true");
  req.searchParams.set("remove_emoji", "false");
  req.searchParams.set("target", "singbox");
  req.searchParams.set("url", url);
  const resp: Response = await fetchWithUA(req.toString(), ua);
  return await resp.text();
}
