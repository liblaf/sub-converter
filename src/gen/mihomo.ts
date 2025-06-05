import YAML from "yaml";
import {
  type Group,
  type MihomoProxyGroup,
  PROXY,
  mihomoProxyGroup,
} from "../group";
import type { ProxyNode } from "../infer";
import type { MihomoProxy } from "../provider";
import { type GenOptionsInput, SCHEMA_GEN_OPTIONS } from "./typed";

export function genMihomo(
  template: string,
  nodes: ProxyNode[],
  groups: Group[],
  options: GenOptionsInput,
): string {
  const opts = SCHEMA_GEN_OPTIONS.parse(options);
  const config = YAML.parse(template);
  config.proxies = nodes.map((node: ProxyNode): MihomoProxy => node.mihomo);
  const proxy: MihomoProxyGroup = mihomoProxyGroup(PROXY, nodes, opts);
  config["proxy-groups"] = [proxy];
  for (const group of groups) {
    const proxyGroup: MihomoProxyGroup = mihomoProxyGroup(group, nodes, opts);
    if (proxyGroup.proxies.length === 0) continue;
    config["proxy-groups"].push(proxyGroup);
    proxy.proxies.push(group.name);
  }
  config["mixed-port"] = opts.port;
  return YAML.stringify(config, { aliasDuplicateObjects: false });
}
