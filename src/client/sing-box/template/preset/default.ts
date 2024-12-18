import {
  ClashMode,
  DnsTag,
  GROUPS,
  GeoipTag,
  GeositeTag,
  InboundTag,
  OutboundTag,
  RulesetTag,
  allGroups,
} from "@/filter";
import { filterSingboxOutbounds } from "../../provider";
import type { Config, InboundMixed, Outbound } from "../../types";
import { addGroup, makeRemoteRuleset } from "../utils";
import type { TemplateFactory, TemplateOptions } from "./types";

export const makeDefaultConfig: TemplateFactory = (
  providers: Map<string, Outbound[]>,
  opts: TemplateOptions,
): Config => {
  let cfg: Config = {
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
        { tag: DnsTag.PROXY, address: "https://8.8.8.8/dns-query" },
        { tag: DnsTag.LOCAL, address: "local", detour: OutboundTag.DIRECT },
        { tag: DnsTag.REJECT, address: "rcode://refused" },
      ],
      rules: [
        // https://sing-box.sagernet.org/configuration/dns/rule/
        { outbound: "any", server: DnsTag.LOCAL },
        { rule_set: GeositeTag.PRIVATE, server: DnsTag.LOCAL },
        { clash_mode: ClashMode.DIRECT, server: DnsTag.LOCAL },
        { clash_mode: ClashMode.GLOBAL, server: DnsTag.PROXY },
        { rule_set: GeositeTag.CN, server: DnsTag.LOCAL },
        {
          type: "logical",
          mode: "and",
          rules: [
            { rule_set: GeositeTag.PROXY, invert: true },
            { rule_set: GeoipTag.CN },
          ],
          server: DnsTag.PROXY,
          client_subnet: "101.6.6.6",
        },
      ],
      final: DnsTag.PROXY,
      independent_cache: true,
    },
    inbounds: [
      // https://sing-box.sagernet.org/configuration/inbound/
      {
        // https://sing-box.sagernet.org/configuration/inbound/mixed/
        type: "mixed",
        tag: InboundTag.MIXED,
        // https://sing-box.sagernet.org/configuration/shared/listen/
        listen: "0.0.0.0",
        listen_port: opts.port,
      } satisfies InboundMixed,
    ],
    outbounds: [
      // https://sing-box.sagernet.org/configuration/outbound/
      { type: "direct", tag: OutboundTag.DIRECT },
      { type: "block", tag: OutboundTag.REJECT },
      { type: "dns", tag: OutboundTag.DNS },
      {
        type: "selector",
        tag: OutboundTag.PROXY,
        outbounds: [OutboundTag.AUTO],
      },
    ],
    route: {
      rules: [
        {
          type: "logical",
          mode: "or",
          rules: [{ protocol: "dns" }, { port: 53 }],
          outbound: OutboundTag.DNS,
        },
        {
          ip_is_private: true,
          rule_set: RulesetTag.PRIVATE,
          outbound: OutboundTag.DIRECT,
        },
        { clash_mode: ClashMode.DIRECT, outbound: OutboundTag.DIRECT },
        { clash_mode: ClashMode.GLOBAL, outbound: OutboundTag.PROXY },
        { rule_set: RulesetTag.CN, outbound: OutboundTag.DIRECT },
        { rule_set: RulesetTag.AI, outbound: OutboundTag.AI },
        { rule_set: RulesetTag.DOWNLOAD, outbound: OutboundTag.DOWNLOAD },
        { rule_set: RulesetTag.EMBY, outbound: OutboundTag.EMBY },
        { rule_set: RulesetTag.MEDIA, outbound: OutboundTag.MEDIA },
      ],
      rule_set: [
        makeRemoteRuleset("geoip", "cn"),
        makeRemoteRuleset("geosite", "ads"),
        makeRemoteRuleset("geosite", "cn"),
        makeRemoteRuleset("geosite", "private"),
        makeRemoteRuleset("geosite", "proxy"),
        makeRemoteRuleset("rule-set", "ads"),
        makeRemoteRuleset("rule-set", "ai"),
        makeRemoteRuleset("rule-set", "cn"),
        makeRemoteRuleset("rule-set", "download"),
        makeRemoteRuleset("rule-set", "emby"),
        makeRemoteRuleset("rule-set", "media"),
        makeRemoteRuleset("rule-set", "private"),
        makeRemoteRuleset("rule-set", "proxy"),
      ],
      final: OutboundTag.PROXY,
      auto_detect_interface: true,
    },
    experimental: {
      cache_file: { enabled: true, store_fakeip: true, store_rdrc: true },
      clash_api: {
        external_controller: "127.0.0.1:9090",
        external_ui: "ui",
        external_ui_download_url: "https://api.liblaf.me/assets/metacubexd.zip",
        external_ui_download_detour: OutboundTag.DIRECT,
        default_mode: "rule",
      },
    },
  };
  for (const group of allGroups()) {
    cfg = addGroup(cfg, providers, group);
  }
  cfg.outbounds?.push(
    ...filterSingboxOutbounds(providers, GROUPS.SELECT.filter),
  );
  return cfg;
};
