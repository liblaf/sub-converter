import { OutboundTag } from "@lib/const";
import {
  FLAGS,
  inferCountry,
  inferRate,
  isCountry,
  isDirect,
  isEmby,
  isExcluded,
  isLimit,
} from "@lib/infer";
import type { ProxyGroup } from "./types";

export function makeCountryGroup(country: string): ProxyGroup {
  if (country === "OT") {
    return {
      type: "selector",
      name: FLAGS[country],
      filter(name: string): boolean {
        if (!SELECT.filter(name)) return false;
        return isCountry(name, country);
      },
    };
  }
  return {
    type: "urltest",
    name: FLAGS[country],
    filter(name: string): boolean {
      if (!AUTO.filter(name)) return false;
      return isCountry(name, country);
    },
  };
}

const AI_COUNTRIES_EXCLUDE = new Set(["HK", "MO", "OT", "TW"]);

export const AI: ProxyGroup = {
  type: "urltest",
  name: OutboundTag.AI,
  filter(name: string): boolean {
    if (!AUTO.filter(name)) return false;
    const country: string = inferCountry(name);
    if (AI_COUNTRIES_EXCLUDE.has(country)) return false;
    return true;
  },
};

const AUTO_COUNTRIES_EXCLUDE = new Set(["VN"]);

export const AUTO: ProxyGroup = {
  type: "urltest",
  name: OutboundTag.AUTO,
  filter(name: string): boolean {
    if (isDirect(name)) return false;
    if (isEmby(name)) return false;
    if (isExcluded(name)) return false;
    const country: string = inferCountry(name);
    if (AUTO_COUNTRIES_EXCLUDE.has(country)) return false;
    return true;
  },
};

export const BALANCED: ProxyGroup = {
  type: "urltest",
  name: OutboundTag.BALANCED,
  filter(name: string): boolean {
    if (!AI.filter(name)) return false;
    if (inferRate(name) > 1.5) return false;
    return true;
  },
};

export const EMBY: ProxyGroup = {
  type: "urltest",
  name: OutboundTag.EMBY,
  filter(name: string): boolean {
    if (isExcluded(name)) return false;
    if (isEmby(name)) return true;
    if (isLimit(name)) return false;
    if (inferRate(name) > 0.5) return false;
    return true;
  },
};

export const SELECT: ProxyGroup = {
  type: "selector",
  name: OutboundTag.SELECT,
  filter(name: string): boolean {
    if (isExcluded(name)) return false;
    return true;
  },
};

export const MEDIA: ProxyGroup = {
  type: "urltest",
  name: OutboundTag.MEDIA,
  filter(name: string): boolean {
    if (!AUTO.filter(name)) return false;
    if (isLimit(name)) return false;
    if (inferRate(name) > 1.5) return false;
    return true;
  },
};

export const DOWNLOAD: ProxyGroup = {
  type: "urltest",
  name: OutboundTag.DOWNLOAD,
  filter(name: string): boolean {
    if (!AUTO.filter(name)) return false;
    if (inferRate(name) > 1.0) return false;
    return true;
  },
};

export const GROUPS = {
  AI,
  AUTO,
  BALANCED,
  DOWNLOAD,
  EMBY,
  MEDIA,
  SELECT,
};

export function defaultGroups(): ProxyGroup[] {
  return [
    AUTO,
    SELECT,
    AI,
    DOWNLOAD,
    EMBY,
    MEDIA,
    ...Object.keys(FLAGS).map(makeCountryGroup),
  ];
}
