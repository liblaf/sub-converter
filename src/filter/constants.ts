export enum ClashMode {
  DIRECT = "direct",
  GLOBAL = "global",
  RULE = "rule",
}

export enum DnsTag {
  FAKEIP = "dns:fakeip",
  LOCAL = "dns:local",
  PROXY = "dns:proxy",
  REJECT = "dns:reject",
}

export enum GeoipTag {
  CN = "geoip:cn",
}

export enum GeositeTag {
  ADS = "geosite:ads",
  CN = "geosite:cn",
  PROXY = "geosite:proxy",
  PRIVATE = "geosite:private",
}

export enum InboundTag {
  MIXED = "in:mixed",
  TUN = "in:tun",
}

export enum OutboundTag {
  AI = "🤖 AI",
  AUTO = "🚀 Auto",
  BALANCED = "⭐ Balanced",
  DIRECT = "DIRECT",
  DNS = "out:dns",
  DOWNLOAD = "☁️ Download",
  EMBY = "🍟 Emby",
  MEDIA = "📺 Media",
  PROXY = "PROXY",
  REJECT = "REJECT",
  SELECT = "🌐 Select",
}

export enum RulesetTag {
  ADS = "rule-set:ads",
  AI = "rule-set:ai",
  CN = "rule-set:cn",
  DOWNLOAD = "rule-set:download",
  EMBY = "rule-set:emby",
  MEDIA = "rule-set:media",
  PRIVATE = "rule-set:private",
  PROXY = "rule-set:proxy",
}
