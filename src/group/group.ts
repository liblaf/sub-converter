import { OutboundTag } from "@lib/const";
import type { ProviderOutbound } from "@lib/outbound";
import type { Country } from "world-countries";
import countries from "world-countries";
import type { Group } from "./typed";

export function makeCountryGroup(country: Country | undefined): Group {
  if (!country) {
    return {
      type: "selector",
      name: "🏳️‍🌈 Unknown",
      filter(outbound: ProviderOutbound): boolean {
        if (outbound.dummy) return false;
        if (outbound.emby) return false;
        if (outbound.info) return true;
        return !outbound.country;
      },
    };
  }
  return {
    type: "urltest",
    name: `${country.flag} ${country.name.common}`,
    filter(outbound: ProviderOutbound): boolean {
      if (outbound.dummy) return false;
      if (outbound.emby) return false;
      if (outbound.info) return false;
      return outbound.country?.cca2 === country.cca2;
    },
  };
}

export const AUTO: Group = {
  type: "urltest",
  name: OutboundTag.AUTO,
  filter(outbound: ProviderOutbound): boolean {
    if (outbound.dummy) return false;
    if (outbound.emby) return false;
    if (outbound.info) return false;
    if (outbound.rate > 2.0) return false;
    return true;
  },
};

export const SELECT: Group = {
  type: "selector",
  name: OutboundTag.SELECT,
  filter(outbound: ProviderOutbound): boolean {
    if (outbound.dummy) return false;
    return true;
  },
};

export const AI: Group = {
  type: "urltest",
  name: OutboundTag.AI,
  filter(outbound: ProviderOutbound): boolean {
    if (outbound.dummy) return false;
    if (outbound.emby) return false;
    if (outbound.info) return false;
    return outbound.ai;
  },
};

export const DOWNLOAD: Group = {
  type: "urltest",
  name: OutboundTag.DOWNLOAD,
  filter(outbound: ProviderOutbound): boolean {
    if (outbound.dummy) return false;
    if (outbound.emby) return false;
    if (outbound.info) return false;
    return outbound.rate < 1.5;
  },
};

export const EMBY: Group = {
  type: "urltest",
  name: OutboundTag.EMBY,
  filter(outbound: ProviderOutbound): boolean {
    if (outbound.dummy) return false;
    if (outbound.emby) return false;
    if (outbound.info) return false;
    if (outbound.rate < 2.0) return true;
    return true;
  },
};

export const MEDIA: Group = {
  type: "urltest",
  name: OutboundTag.MEDIA,
  filter(outbound: ProviderOutbound): boolean {
    if (outbound.dummy) return false;
    if (outbound.emby) return false;
    if (outbound.info) return false;
    return outbound.rate < 2.0;
  },
};

export function defaultGroups(): Group[] {
  return [
    AUTO,
    SELECT,
    AI,
    DOWNLOAD,
    EMBY,
    MEDIA,
    makeCountryGroup(undefined),
    ...countries.map(makeCountryGroup),
  ];
}
