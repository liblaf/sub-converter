export type OutboundUrltest = {
  // https://sing-box.sagernet.org/configuration/outbound/urltest/
  type: "urltest";
  tag: string;
  outbounds: string[];
  url?: string;
  interval?: string;
  tolerance?: number;
  idle_timeout?: string;
  interrupt_exist_connections?: boolean;
};
