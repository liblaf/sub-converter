export type Config = {
  // https://sing-box.sagernet.org/configuration/
  log?: object;
  dns?: object;
  ntp?: object;
  endpoints?: object[];
  inbounds?: object[];
  outbounds?: Outbound[];
  route?: object;
  experimental?: object;
};

export type Outbound = {
  type: string;
  tag: string;
  [key: string]: any;
};
