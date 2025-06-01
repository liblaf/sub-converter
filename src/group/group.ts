import countries, { type Country } from "world-countries";
import { type ProxyNode, UNKNOWN } from "../infer";

export type Group = {
  name: string;
  type: "select" | "url-test";
  url?: string;
  interval?: number;
  lazy?: boolean;
  timeout?: number;
  icon?: string;

  filter(node: ProxyNode): boolean;
};

export function defineGroup(options: Group): Group {
  return {
    url: "https://cp.cloudflare.com",
    interval: 300,
    lazy: true,
    timeout: 5000,
    ...options,
  };
}

export function defineRegionGroup(region: Country): Group {
  return defineGroup({
    name: `${region.flag} ${region.name.common}`,
    type: region.cca2 === UNKNOWN.cca2 ? "select" : "url-test",
    filter(node: ProxyNode): boolean {
      return node.region.cca2 === region.cca2 && !node.emby;
    },
  });
}

export const PROXY: Group = defineGroup({
  name: "PROXY",
  type: "select",
  filter(_node: ProxyNode): boolean {
    return false;
  },
});

export const SELECT: Group = defineGroup({
  name: "SELECT",
  type: "select",
  filter(_node: ProxyNode): boolean {
    return true;
  },
});

export const AUTO: Group = defineGroup({
  name: "🚀 Auto",
  type: "url-test",
  filter(node: ProxyNode): boolean {
    return !node.emby && node.rate < 2.0;
  },
});

const AI_EXCLUDE_REGIONS = new Set([UNKNOWN.cca2, "CN", "HK", "MO"]);
export const AI: Group = defineGroup({
  name: "🤖 AI",
  type: "url-test",
  filter(node: ProxyNode): boolean {
    return !node.emby && !AI_EXCLUDE_REGIONS.has(node.region.cca2);
  },
});

export const DOWNLOAD: Group = defineGroup({
  name: "📥 Download",
  type: "url-test",
  filter(node: ProxyNode): boolean {
    return !node.emby && node.rate <= 1.0;
  },
});

export const EMBY: Group = defineGroup({
  name: "📺 Emby",
  type: "url-test",
  filter(node: ProxyNode): boolean {
    return node.emby || node.rate <= 1.0;
  },
});

export const STREAM: Group = defineGroup({
  name: "📺 Stream",
  type: "url-test",
  filter(node: ProxyNode): boolean {
    return !node.emby && node.rate < 2.0;
  },
});

export function groups(): Group[] {
  const groups: Group[] = [AUTO, SELECT, AI, DOWNLOAD, EMBY, STREAM];
  groups.push(...countries.map(defineRegionGroup));
  return groups;
}
