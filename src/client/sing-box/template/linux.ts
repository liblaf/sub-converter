import type { Config } from "../types";

export const LINUX: Config = {
  // https://sing-box.sagernet.org/configuration/
  log: {
    // https://sing-box.sagernet.org/configuration/log/
    disabled: false,
    level: "warn",
    timestamp: false,
  },
  dns: {
    // https://sing-box.sagernet.org/configuration/dns/
    servers: [
      // https://sing-box.sagernet.org/configuration/dns/server/
      { tag: "dns:proxy", address: "https://8.8.8.8/dns-query" },
      { tag: "dns:local", address: "local", detour: "DIRECT" },
      { tag: "dns:reject", address: "rcode://refused" },
    ],
    rules: [
      // https://sing-box.sagernet.org/configuration/dns/rule/
      { outbound: "any", server: "dns:local" },
      { rule_set: "geosite:private", server: "dns:local" },
      { clash_mode: "direct", server: "dns:local" },
      { clash_mode: "proxy", server: "dns:proxy" },
      { rule_set: "geosite:cn", server: "dns:local" },
      {
        type: "logical",
        mode: "and",
        rules: [
          { rule_set: "geosite:proxy", invert: true },
          { rule_set: "geoip:cn" },
        ],
        server: "dns:proxy",
        client_subnet: "101.6.6.6",
      },
    ],
    final: "dns:proxy",
    independent_cache: true,
  },
  inbounds: [
    // https://sing-box.sagernet.org/configuration/inbound/
    {
      // https://sing-box.sagernet.org/configuration/inbound/mixed/
      type: "mixed",
      tag: "in:mixed",
      // https://sing-box.sagernet.org/configuration/shared/listen/
      listen: "0.0.0.0",
      listen_port: 0,
      sniff: true,
      sniff_override_destination: true,
    },
  ],
  outbounds: [
    // https://sing-box.sagernet.org/configuration/outbound/
    { type: "direct", tag: "DIRECT" }, // https://sing-box.sagernet.org/configuration/outbound/direct/
    { type: "block", tag: "REJECT" }, // https://sing-box.sagernet.org/configuration/outbound/block/
    { type: "dns", tag: "out:dns" }, // https://sing-box.sagernet.org/configuration/outbound/dns/
    { type: "selector", tag: "PROXY", outbounds: [] }, // https://sing-box.sagernet.org/configuration/outbound/selector/
  ],
  route: {
    rules: [
      {
        type: "logical",
        mode: "or",
        rules: [{ protocol: "dns" }, { port: 53 }],
        outbound: "out:dns",
      },
      {
        ip_is_private: true,
        rule_set: "rule-set:private",
        outbound: "DIRECT",
      },
      { clash_mode: "direct", outbound: "DIRECT" },
      { clash_mode: "global", outbound: "PROXY" },
      { rule_set: "rule-set:cn", outbound: "DIRECT" },
      { rule_set: "rule-set:ai", outbound: "🤖 AI" },
      { rule_set: "rule-set:download", outbound: "☁️ Download" },
      { rule_set: "rule-set:emby", outbound: "🍟 Emby" },
      { rule_set: "rule-set:media", outbound: "📺 Media" },
    ],
    rule_set: [
      {
        type: "remote",
        tag: "geoip:cn",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/geoip/cn.srs",
        download_detour: "DIRECT",
      },
      {
        type: "remote",
        tag: "geosite:ads",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/geosite/ads.srs",
        download_detour: "DIRECT",
      },
      {
        type: "remote",
        tag: "geosite:cn",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/geosite/cn.srs",
        download_detour: "DIRECT",
      },
      {
        type: "remote",
        tag: "geosite:proxy",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/geosite/proxy.srs",
        download_detour: "DIRECT",
      },
      {
        type: "remote",
        tag: "geosite:private",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/geosite/private.srs",
        download_detour: "DIRECT",
      },
      {
        type: "remote",
        tag: "rule-set:ads",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/rule-set/ads.srs",
        download_detour: "DIRECT",
      },
      {
        type: "remote",
        tag: "rule-set:ai",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/rule-set/ai.srs",
        download_detour: "DIRECT",
      },
      {
        type: "remote",
        tag: "rule-set:cn",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/rule-set/cn.srs",
        download_detour: "DIRECT",
      },
      {
        type: "remote",
        tag: "rule-set:download",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/rule-set/download.srs",
        download_detour: "DIRECT",
      },
      {
        type: "remote",
        tag: "rule-set:emby",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/rule-set/emby.srs",
        download_detour: "DIRECT",
      },
      {
        type: "remote",
        tag: "rule-set:media",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/rule-set/media.srs",
        download_detour: "DIRECT",
      },
      {
        type: "remote",
        tag: "rule-set:private",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/rule-set/private.srs",
        download_detour: "DIRECT",
      },
      {
        type: "remote",
        tag: "rule-set:proxy",
        format: "binary",
        url: "https://api.liblaf.me/rules/sing/rule-set/proxy.srs",
        download_detour: "DIRECT",
      },
    ],
    final: "PROXY",
    auto_detect_interface: true,
  },
  experimental: {
    cache_file: { enabled: true, store_fakeip: true, store_rdrc: true },
    clash_api: {
      external_controller: "127.0.0.1:9090",
      external_ui: "ui",
      external_ui_download_url: "https://api.liblaf.me/assets/metacubexd.zip",
      external_ui_download_detour: "DIRECT",
      default_mode: "rule",
    },
  },
} satisfies Config;
