export interface FetchErrorOptions extends ErrorOptions {
  url: string;
  status?: number;
  statusText?: string;
  responseText?: string;
}

export class FetchError extends Error {
  url: string;
  status?: number;
  statusText?: string;
  responseText?: string;

  constructor(message: string, options: FetchErrorOptions) {
    super(message, options);
    this.name = "FetchError";
    this.url = options.url;
    this.status = options.status;
    this.statusText = options.statusText;
    this.responseText = options.responseText;
  }

  toString(): string {
    let str = `FetchError: ${this.message}`;
    str += `\nURL: ${this.url}`;
    if (this.status) str += `\nStatus: ${this.status}`;
    if (this.statusText) str += `\nStatus Text: ${this.statusText}`;
    if (this.responseText) str += `\nResponse: ${this.responseText}`;
    return str;
  }
}

export async function get(url: string, ua?: string): Promise<Response> {
  const init: RequestInit = { redirect: "follow" };
  if (ua) init.headers = { "User-Agent": ua };
  try {
    const resp: Response = await fetch(url, init);
    if (!resp.ok) {
      let respText: string | undefined = undefined;
      let cause: any = undefined;
      try {
        respText = await resp.text();
      } catch (err) {
        cause = err;
      }
      throw new FetchError(`Failed to fetch ${url}`, {
        url,
        status: resp.status,
        statusText: resp.statusText,
        responseText: respText,
        cause: respText ? undefined : cause,
      });
    }
    return resp;
  } catch (err) {
    if (err instanceof FetchError) throw err;
    throw new FetchError(`Failed to fetch ${url}`, {
      url,
      cause: err instanceof Error ? err : new Error(`${err}`),
    });
  }
}
