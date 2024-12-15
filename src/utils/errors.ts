export class SubConverterError extends Error {}

export class UnknownUriProtocolError extends SubConverterError {
  constructor(readonly uri: string) {
    super(`Unknown URI Protocol: ${uri}`);
  }
}

export class UriParseError extends SubConverterError {
  constructor(
    readonly type: string,
    readonly uri: string,
  ) {
    super(`Invalid ${type} URI: ${uri}`);
  }
}
