import {
  inferCountry,
  inferRate,
  isCountry,
  isEmby,
  isExcluded,
  isLimit,
} from "./infer";
import type { ProxyFilter } from "./types";

const AI_COUNTRIES_EXCLUDE = new Set(["HK", "MO", "OT", "TW"]);

export function createCountryFilter(country: string): ProxyFilter {
  return (name: string): boolean => {
    if (!autoFilter(name)) return false;
    return isCountry(name, country);
  };
}

export const aiFilter: ProxyFilter = (name: string): boolean => {
  if (!autoFilter(name)) return false;
  const country = inferCountry(name);
  if (AI_COUNTRIES_EXCLUDE.has(country)) return false;
  return true;
};

export const autoFilter: ProxyFilter = (name: string): boolean => {
  if (isExcluded(name)) return false;
  if (isEmby(name)) return false;
  return true;
};

export const balancedFilter: ProxyFilter = (name: string): boolean => {
  if (!aiFilter(name)) return false;
  if (inferRate(name) > 1.5) return false;
  return true;
};

export const embyFilter: ProxyFilter = (name: string): boolean => {
  if (isExcluded(name)) return false;
  if (isEmby(name)) return true;
  if (isLimit(name)) return false;
  if (inferRate(name) > 0.5) return false;
  return true;
};

export const globalFilter: ProxyFilter = (name: string): boolean => {
  if (isExcluded(name)) return false;
  return true;
};

export const mediaFilter: ProxyFilter = (name: string): boolean => {
  if (!autoFilter(name)) return false;
  if (isLimit(name)) return false;
  if (inferRate(name) > 1.5) return false;
  return true;
};

export const downloadFilter: ProxyFilter = (name: string): boolean => {
  if (!autoFilter(name)) return false;
  if (inferRate(name) > 1.0) return false;
  return true;
};
