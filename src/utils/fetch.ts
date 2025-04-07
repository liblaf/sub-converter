export class FetchError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(`FetchError: ${response.status} ${response.statusText}`);
    this.response = response;
  }
}

export async function fetchWithUA(url: string, ua?: string): Promise<Response> {
  const init: RequestInit = { redirect: "follow" };
  if (ua) init.headers = { "User-Agent": ua };
  const resp: Response = await fetch(url, init);
  if (!resp.ok) throw new FetchError(resp);
  return resp;
}
