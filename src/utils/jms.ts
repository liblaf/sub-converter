export function jmsSubUrl({
  service,
  id,
}: { service: string; id: string }): URL {
  const url = new URL("https://jmssub.net/members/getsub.php");
  url.searchParams.set("service", service);
  url.searchParams.set("id", id);
  return url;
}

export function jmsSubInfoUrl({
  service,
  id,
}: { service: string; id: string }): URL {
  const url = new URL("https://justmysocks.net/members/getbwcounter.php");
  url.searchParams.set("service", service);
  url.searchParams.set("id", id);
  return url;
}
