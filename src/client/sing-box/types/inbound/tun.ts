export type InboundTun = {
  type: "tun";
  tag: string;
  address?: string[];
  auto_route?: boolean;
  strict_route?: boolean;
};
