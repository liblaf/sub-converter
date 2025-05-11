import YAML from "yaml";
import {
  type Group,
  type MihomoProxyGroup,
  PROXY,
  mihomoProxyGroup,
} from "../group";
import type { Node } from "../infer";
import type { MihomoProxy } from "../provider";
import { type GenOptionsInput, SCHEMA_GEN_OPTIONS } from "./typed";

export function genMihomo(
  template: string,
  nodes: Node[],
  groups: Group[],
  options: GenOptionsInput,
): string {
  const { port } = SCHEMA_GEN_OPTIONS.parse(options);
  const config = YAML.parse(template);
  config.proxies = nodes.map((node: Node): MihomoProxy => node.mihomo);
  const proxy: MihomoProxyGroup = mihomoProxyGroup(PROXY, nodes);
  config["proxy-groups"] = [proxy];
  for (const group of groups) {
    const proxyGroup: MihomoProxyGroup = mihomoProxyGroup(group, nodes);
    if (proxyGroup.proxies.length === 0) continue;
    config["proxy-groups"].push(proxyGroup);
    proxy.proxies.push(group.name);
  }
  config["mixed-port"] = port;
  return YAML.stringify(config);
}
