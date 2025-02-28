export type ProxyGroup = {
  type: "selector" | "urltest";
  name: string;
  filter(name: string): boolean;
};
