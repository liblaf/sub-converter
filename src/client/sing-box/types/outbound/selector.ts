export type OutboundSelector = {
  // https://sing-box.sagernet.org/configuration/outbound/selector/
  type: "selector";
  tag: string;
  outbounds: string[];
  default?: string;
  interrupt_exist_connections?: boolean;
};
