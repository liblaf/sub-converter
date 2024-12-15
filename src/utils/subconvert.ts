export async function subconvert(
  target: string,
  url: string,
  backend = "https://url.v1.mk/sub",
): Promise<string> {
  const req = new URL(backend);
  req.searchParams.set("target", target);
  req.searchParams.set("url", url);
  req.searchParams.set("exclude", "$^");
  req.searchParams.set("add_emoji", "false");
  req.searchParams.set("remove_emoji", "false");
  req.searchParams.set("list", "true");
  const resp = await fetch(req);
  if (!resp.ok)
    throw new Error(`Failed to convert: ${url}\n${await resp.text()}`);
  const text = await resp.text();
  return text;
}