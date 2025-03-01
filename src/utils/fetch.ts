export class FetchError extends Error {
  name = "FetchError";

  constructor(url: string, response: Response) {
    super(`Failed to fetch ${url}`);
  }
}

export async function fetchWithUA(url: string, ua?: string): Promise<Response> {
  const init: RequestInit = { redirect: "follow" };
  if (ua) init.headers = { "User-Agent": ua };
  const resp: Response = await fetch(url, init);
  if (!resp.ok) throw new FetchError(url, resp);
  return resp;
}
