export type { DNSServer } from "./server";

import type { DNSServer } from "./server";

export type DNS = {
  // https://sing-box.sagernet.org/configuration/dns/
  servers?: DNSServer[];
  [key: string]: any;
};
