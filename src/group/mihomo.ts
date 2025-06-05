import type { GenOptions } from "../gen";
import type { ProxyNode } from "../infer";
import type { Group } from "./group";

export type MihomoProxyGroup = {
  name: string;
  type: "select" | "url-test";
  proxies: string[];
  url?: string;
  interval?: number;
  lazy?: boolean;
  timeout?: number;
  icon?: string;
};

export function mihomoProxyGroup(
  group: Group,
  nodes: ProxyNode[],
  options: GenOptions,
): MihomoProxyGroup {
  const proxy: MihomoProxyGroup = {
    name: group.name,
    type: group.type,
    proxies: nodes
      .filter(group.filter)
      .map((node: ProxyNode): string => node.name),
    url: group.url,
    interval: group.interval,
    lazy: group.lazy,
    timeout: group.timeout,
  };
  if (options.emoji && group.emoji) {
    proxy.name = `${group.emoji} ${proxy.name}`;
  }
  if (options.icon && group.icon) {
    proxy.icon = group.icon;
  }
  return proxy;
}
