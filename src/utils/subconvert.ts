export function subconvert(url: string, target = "clash.meta"): string {
  const req = new URL("https://url.v1.mk/sub");
  req.searchParams.set("url", url);
  req.searchParams.set("target", target);
  req.searchParams.set("list", "true");
  return req.toString();
}
