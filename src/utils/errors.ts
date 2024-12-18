import type { ProviderOptions } from "@/provider";

export class SubConverterError extends Error {
  name = "SubConverterError";
}

export class UnknownUriProtocolError extends SubConverterError {
  name = "UnknownUriProtocolError";

  constructor(
    readonly uri: string,
    options?: { cause?: unknown },
  ) {
    super(`Unknown URI Protocol: ${uri}`, options);
  }
}

export class UriParseError extends SubConverterError {
  name = "UriParseError";

  constructor(
    readonly type: string,
    readonly uri: string,
    options?: { cause?: unknown },
  ) {
    super(`Invalid ${type} URI: ${uri}`, options);
  }
}

export class InvalidProviderError extends SubConverterError {
  name = "InvalidProviderError";

  constructor(
    readonly provider: ProviderOptions,
    options?: { cause?: unknown },
  ) {
    super(`Invalid Provider: ${provider.name}`, options);
  }
}
