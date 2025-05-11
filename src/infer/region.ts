import type { Country } from "world-countries";
import type { NodeInfo } from "./typed";

import * as geoip from "geoip-lite";
import countries from "world-countries";

export const UNKNOWN = {
  name: {
    common: "Unknown",
  },
  cca2: "UN",
} as Country;

export function region(node: NodeInfo): Country {
  if (node.server) {
    const country: Country | undefined = regionByIp(node.server);
    if (country && country.cca2 !== "CN") return country;
  }
  const country: Country | undefined = regionByName(node.name);
  if (country) return country;
  return UNKNOWN;
}

function regionByIp(ip: string): Country | undefined {
  const lookup: geoip.Lookup | null = geoip.lookup(ip);
  if (!lookup) return undefined;
  const country: Country | undefined = countries.find(
    (c: Country): boolean => c.cca2 === lookup.country,
  );
  if (!country) return undefined;
  return country;
}

function regionByName(name: string): Country | undefined {
  for (const country of countries) {
    for (const pattern of patterns(country)) {
      if (name.match(pattern)) {
        console.debug(
          `${name} =~ ${pattern} (${country.flag} ${country.name.common})`,
        );
        return country;
      }
    }
  }
  return undefined;
}

const EXCLUDE_PATTERNS = new Set(["GB"]);

function* patterns(country: Country): Generator<RegExp> {
  for (const name of namesMaybeEmpty(country)) {
    if (!name) continue;
    if (name.match(/[0-9]+/g)) continue;
    if (EXCLUDE_PATTERNS.has(name)) continue;
    if (name.length < 4) yield new RegExp(name);
    else yield new RegExp(name, "i");
  }
}

function* namesMaybeEmpty(country: Country): Generator<string | undefined> {
  for (const locale of ["en", "zh"]) {
    for (const style of ["narrow", "short", "long"]) {
      const display = new Intl.DisplayNames(locale, {
        style: style as Intl.RelativeTimeFormatStyle,
        type: "region",
      });
      yield display.of(country.cca2);
    }
  }
  yield country.name.common;
  yield country.name.official;
  for (const lang in country.name.native) {
    yield country.name.native[lang].common;
    yield country.name.native[lang].official;
  }
  yield country.cca2;
  yield country.ccn3;
  yield country.cca3;
  yield country.cioc;
  for (const capital of country.capital) yield capital;
  for (const alt of country.altSpellings) yield alt;
}
