import type { NodeInfo } from "./typed";

export function emby(node: NodeInfo): boolean {
  if (node.name.match(/emby/i)) return true;
  return false;
}
