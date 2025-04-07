import { LRUCache } from "lru-cache";
import countries, { type Country } from "world-countries";

const CACHE = new LRUCache<string, Country>({ max: 128 });

export function inferCountry(name: string): Country | undefined {
  if (CACHE.has(name)) return CACHE.get(name);
  for (const country of countries) {
    for (const pattern of names(country)) {
      // console.debug(
      //   `inferCountry: ${name} -> ${pattern} (${country.name.common})`,
      // );
      if (name.toLocaleLowerCase().includes(pattern.toLocaleLowerCase())) {
        console.debug(
          `inferCountry: ${name} -> ${pattern} (${country.name.common})`,
        );
        CACHE.set(name, country);
        return country;
      }
    }
  }
  CACHE.set(name, undefined);
}

function name(
  country: Country,
  locale: Intl.LocalesArgument = "en",
  style: Intl.RelativeTimeFormatStyle = "narrow",
): string | undefined {
  const display = new Intl.DisplayNames(locale, { style, type: "region" });
  return display.of(country.cca2);
}

function* names(country: Country): Generator<string> {
  for (const name of namesMaybeEmpty(country)) {
    if (name) yield name;
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
  yield country.ccn3;
  yield country.cca3;
  yield country.cioc;
  for (const capital of country.capital) yield capital;
  for (const alt of country.altSpellings) yield alt;
}
