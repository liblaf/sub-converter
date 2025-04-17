import type { Outbound } from "@lib/schema";
import * as geoip from "geoip-lite";
import countries, { type Country } from "world-countries";

export function inferCountry(outbound: Outbound): Country | null {
  if ("server" in outbound) {
    const server = outbound.server as string;
    const country: Country | null = matchCountryByIp(server);
    if (country && country.cca2 !== "CN") return country;
  }
  return matchCountryByTag(outbound.tag);
}

export function inferDirect(outbound: Outbound): boolean {
  if ("server" in outbound) {
    const server = outbound.server as string;
    const country: Country | null = matchCountryByIp(server);
    if (country) return country.cca2 !== "CN";
  }
  return !!outbound.tag.match(/直连/);
}

export function matchCountryByIp(ip: string): Country | null {
  const lookup: geoip.Lookup | null = geoip.lookup(ip);
  if (lookup) {
    const country: Country | undefined = countries.find(
      (c: Country): boolean => c.cca2 === lookup.country,
    );
    if (country) return country;
  }
  return null;
}

export function matchCountryByTag(tag: string): Country | null {
  for (const country of countries) {
    for (const pattern of patterns(country)) {
      if (tag.match(pattern)) return country;
    }
  }
  return null;
}

function name(
  country: Country,
  locale: Intl.LocalesArgument = "en",
  style: Intl.RelativeTimeFormatStyle = "narrow",
): string | undefined {
  const display = new Intl.DisplayNames(locale, { style, type: "region" });
  return display.of(country.cca2);
}

function* patterns(country: Country): Generator<RegExp> {
  for (const name of namesMaybeEmpty(country)) {
    if (!name) continue;
    if (name.length < 4) yield new RegExp(name);
    else yield new RegExp(name, "i");
  }
}

function* namesMaybeEmpty(country: Country): Generator<string | undefined> {
  for (const locale of ["en", "zh"]) {
    for (const style of ["narrow", "short", "long"]) {
      yield name(country, locale, style as any);
    }
  }
  yield country.name.common;
  yield country.name.official;
  for (const lang in country.name.native) {
    yield country.name.native[lang].common;
    yield country.name.native[lang].official;
  }
  yield country.cca2;
  if (country.ccn3.matchAll(/^[a-zA-Z]+$/g)) yield country.ccn3;
  yield country.cca3;
  yield country.cioc;
  for (const capital of country.capital) yield capital;
  for (const alt of country.altSpellings) yield alt;
}
