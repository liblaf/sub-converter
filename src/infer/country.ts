import { newLogger } from "@lib/utils";

const logger = newLogger();

export function inferCountry(name: string): string {
  for (const [country, pattern] of Object.entries(REGEXPS)) {
    if (pattern.test(name)) return country;
  }
  logger.warn(`inferCountry(): Unable to infer country for name "${name}"`);
  return "OT";
}

export function isCountry(name: string, country: string): boolean {
  if (country === "OT") {
    const inferred = inferCountry(name);
    return inferred === "OT";
  }
  return REGEXPS[country].test(name);
}

export const FLAGS: Record<string, string> = {
  AQ: "🇦🇶 Antarctica",
  AR: "🇦🇷 Argentina",
  AU: "🇦🇺 Australia",
  BD: "🇧🇩 Bangladesh",
  BN: "🇧🇳 Brunei",
  BR: "🇧🇷 Brazil",
  BT: "🇧🇹 Bhutan",
  CA: "🇨🇦 Canada",
  DE: "🇩🇪 Germany",
  FR: "🇫🇷 France",
  GB: "🇬🇧 UK",
  GU: "🇬🇺 Guam",
  HK: "🇭🇰 Hong Kong",
  ID: "🇮🇩 Indonesia",
  IN: "🇮🇳 India",
  IS: "🇮🇸 Iceland",
  JP: "🇯🇵 Japan",
  KH: "🇰🇭 Cambodia",
  KP: "🇰🇵 North Korea",
  KR: "🇰🇷 South Korea",
  LA: "🇱🇦 Laos",
  LK: "🇱🇰 Sri Lanka",
  MM: "🇲🇲 Myanmar",
  MO: "🇲🇴 Macao",
  MY: "🇲🇾 Malaysia",
  NG: "🇳🇬 Nigeria",
  NL: "🇳🇱 Netherlands",
  NP: "🇳🇵 Nepal",
  NZ: "🇳🇿 New Zealand",
  PG: "🇵🇬 Papua New Guinea",
  PH: "🇵🇭 Philippines",
  PK: "🇵🇰 Pakistan",
  RU: "🇷🇺 Russia",
  SG: "🇸🇬 Singapore",
  TH: "🇹🇭 Thailand",
  TR: "🇹🇷 Türkiye",
  TW: "🇹🇼 Taiwan",
  US: "🇺🇸 US",
  VN: "🇻🇳 Vietnam",

  OT: "🏳️‍🌈 Other",
};

const REGEXPS: Record<string, RegExp> = {
  AQ: /🇦🇶|AQ|Antarctica|南极洲/,
  AR: /🇦🇷|AR|Argentina|阿根廷/,
  AU: /🇦🇺|AU|Australia|澳大利亚/,
  BD: /🇧🇩|BD|Bangladesh|孟加拉国/,
  BN: /🇧🇳|BN|Brunei|文莱/,
  BR: /🇧🇷|BR|Brazil|巴西/,
  BT: /🇧🇹|BT|Bhutan|不丹/,
  CA: /🇨🇦|CA|Canada|加拿大/,
  DE: /🇩🇪|DE|Germany|德国|German/,
  FR: /🇫🇷|FR|France|法国/,
  GB: /🇬🇧|GB|UK|United Kingdom|英国/,
  GU: /🇬🇺|GU|Guam|关岛/,
  HK: /🇭🇰|HK|Hong Kong|Hong Kong SAR China|香港|中国香港特别行政区/,
  ID: /🇮🇩|ID|Indonesia|印度尼西亚/,
  IN: /🇮🇳|IN|India|印度(?!尼西亚)/,
  IS: /🇮🇸|IS|Iceland|冰岛/,
  JP: /🇯🇵|JP|Japan|日本/,
  KH: /🇰🇭|KH|Cambodia|柬埔寨/,
  KP: /🇰🇵|KP|North Korea|朝鲜/,
  KR: /🇰🇷|KR|South Korea|韩国/,
  LA: /🇱🇦|LA|Laos|老挝/,
  LK: /🇱🇰|LK|Sri Lanka|斯里兰卡/,
  MM: /🇲🇲|MM|Myanmar|Myanmar (Burma)|缅甸/,
  MO: /🇲🇴|MO|Macao|Macao SAR China|澳门|中国澳门特别行政区/,
  MY: /🇲🇾|MY|Malaysia|马来西亚/,
  NG: /🇳🇬|NG|Nigeria|尼日利亚/,
  NL: /🇳🇱|NL|Netherlands|荷兰/,
  NP: /🇳🇵|NP|Nepal|尼泊尔/,
  NZ: /🇳🇿|NZ|New Zealand|新西兰/,
  PG: /🇵🇬|PG|Papua New Guinea|巴布亚新几内亚/,
  PH: /🇵🇭|PH|Philippines|菲律宾/,
  PK: /🇵🇰|PK|Pakistan|巴基斯坦/,
  RU: /🇷🇺|RU|Russia|俄罗斯/,
  SG: /🇸🇬|SG|Singapore|新加坡/,
  TH: /🇹🇭|TH|Thailand|泰国/,
  TR: /🇹🇷|TR|Türkiye|土耳其|Turkey/,
  TW: /🇹🇼|TW|Taiwan|台湾/,
  US: /🇺🇸|US|United States|美国/,
  VN: /🇻🇳|VN|Vietnam|越南/,
};
