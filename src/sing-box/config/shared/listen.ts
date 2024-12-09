export type ListenFields = {
  listen: string;
  listen_port?: number;
  tcp_fast_open?: boolean;
  tcp_multi_path?: boolean;
  udp_fragment?: boolean;
  udp_timeout?: boolean;
  detour?: boolean;
};
