import type { Node } from "../infer";
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
  nodes: Node[] = [],
): MihomoProxyGroup {
  return {
    name: group.name,
    type: group.type,
    proxies: nodes.filter(group.filter).map((node: Node): string => node.name),
    url: group.url,
    interval: group.interval,
    lazy: group.lazy,
    timeout: group.timeout,
    icon: group.icon,
  };
}
