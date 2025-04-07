import countries, { type Country } from "world-countries";

export function inferCountry(name: string): Country | undefined {
  for (const country of countries) {
    for (const pattern of patterns(country)) {
      if (name.match(pattern)) return country;
    }
  }
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
  yield country.ccn3;
  yield country.cca3;
  yield country.cioc;
  for (const capital of country.capital) yield capital;
  for (const alt of country.altSpellings) yield alt;
}
