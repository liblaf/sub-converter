export class UnknownUriProtocolError extends Error {
  constructor(readonly uri: string) {
    super(`Unknown URI Protocol: ${uri}`);
  }
}

export class URIParseError extends Error {
  constructor(
    readonly type: string,
    readonly uri: string,
  ) {
    super(`Invalid ${type} URI: ${uri}`);
  }
}
