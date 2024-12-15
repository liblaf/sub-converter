export type ProxyFilter = {
  name: string;
  filter: (name: string) => boolean;
};
