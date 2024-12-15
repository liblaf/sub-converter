export class FetchError extends Error {
  readonly name: string = "FetchError";
  readonly resp?: Response;
  readonly url: string;

  constructor(
    input: string | URL | Request,
    options?: { cause?: unknown; message?: string; resp?: Response },
  ) {
    const url: string = asString(input);
    let message = `Failed to fetch: ${url}`;
    if (options?.message) message += `\n${options.message}`;
    if (options?.cause) message += `\nCaused by: ${options.cause}`;
    if (options?.resp) message += `\nResponse: ${options.resp}`;
    super(message, { cause: options?.cause });
    this.resp = options?.resp;
    this.url = url;
  }
}

export async function fetchUnsafe(
  input: string | URL | Request,
  init?: RequestInit,
): Promise<Response> {
  try {
    const resp: Response = await fetch(input, { redirect: "follow", ...init });
    if (!resp.ok) {
      const text: string = await resp.text();
      throw new FetchError(input, { message: text, resp: resp });
    }
    return resp;
  } catch (error) {
    throw new FetchError(input, { cause: error });
  }
}

function asString(input: string | URL | Request): string {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  if (input instanceof Request) return input.url;
  return `${input}`;
}
