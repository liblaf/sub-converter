import { OutboundTag } from "./constants";
import {
  FLAGS,
  inferCountry,
  inferRate,
  isCountry,
  isEmby,
  isExcluded,
  isLimit,
} from "./infer";
import type { ProxyFilter } from "./types";

const AI_COUNTRIES_EXCLUDE = new Set(["HK", "MO", "OT", "TW"]);

export function makeCountryFilter(country: string): ProxyFilter {
  return {
    name: FLAGS[country],
    filter(name: string): boolean {
      if (!AUTO.filter(name)) return false;
      return isCountry(name, country);
    },
  };
}

export const AI: ProxyFilter = {
  name: OutboundTag.AI,
  filter(name: string): boolean {
    if (!AUTO.filter(name)) return false;
    const country: string = inferCountry(name);
    if (AI_COUNTRIES_EXCLUDE.has(country)) return false;
    return true;
  },
};

export const AUTO: ProxyFilter = {
  name: OutboundTag.AUTO,
  filter(name: string): boolean {
    if (isExcluded(name)) return false;
    if (isEmby(name)) return false;
    return true;
  },
};

export const BALANCED: ProxyFilter = {
  name: OutboundTag.BALANCED,
  filter(name: string): boolean {
    if (!AI.filter(name)) return false;
    if (inferRate(name) > 1.5) return false;
    return true;
  },
};

export const EMBY: ProxyFilter = {
  name: OutboundTag.EMBY,
  filter(name: string): boolean {
    if (isExcluded(name)) return false;
    if (isEmby(name)) return true;
    if (isLimit(name)) return false;
    if (inferRate(name) > 0.5) return false;
    return true;
  },
};

export const SELECT: ProxyFilter = {
  name: OutboundTag.SELECT,
  filter(name: string): boolean {
    if (isExcluded(name)) return false;
    return true;
  },
};

export const MEDIA: ProxyFilter = {
  name: OutboundTag.MEDIA,
  filter(name: string): boolean {
    if (!AUTO.filter(name)) return false;
    if (isLimit(name)) return false;
    if (inferRate(name) > 1.5) return false;
    return true;
  },
};

export const DOWNLOAD: ProxyFilter = {
  name: OutboundTag.DOWNLOAD,
  filter(name: string): boolean {
    if (!AUTO.filter(name)) return false;
    if (inferRate(name) > 1.0) return false;
    return true;
  },
};

export const GROUPS = {
  AI: AI,
  AUTO: AUTO,
  BALANCED: BALANCED,
  EMBY: EMBY,
  SELECT: SELECT,
  MEDIA: MEDIA,
  DOWNLOAD: DOWNLOAD,
};
