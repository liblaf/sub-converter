export type { RouteRule } from "./rule";

import type { RouteRule } from "./rule";

export type Route = {
  // https://sing-box.sagernet.org/configuration/route/
  rules?: RouteRule[];
  [key: string]: any;
};
