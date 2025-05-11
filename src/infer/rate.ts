import type { NodeInfo } from "./typed";

export function rate(node: NodeInfo): number {
  if (node.provider === "JMS") return 0.0;
  const match: RegExpMatchArray | null = node.name.match(
    /(([0-9]*[.])?[0-9]+)x/i,
  );
  if (match) return Number.parseFloat(match[1]);
  return 1.0;
}
