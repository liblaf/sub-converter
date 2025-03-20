import type {
  InboundMixed,
  OutboundSelector,
  OutboundUrltest,
  Singbox,
} from "@lib/client/sing-box/schema";
import {
  ClashMode,
  DnsTag,
  GeoipTag,
  GeositeTag,
  InboundTag,
  OutboundTag,
  RulesetTag,
} from "@lib/const";
import { type ProxyGroup, SELECT, defaultGroups } from "@lib/group";
import * as R from "remeda";
import { sanitize } from "../sanitize";
import type { GeneratorSingbox, GeneratorSingboxOptions } from "../types";
import { findInbound, findOrCreateGroup, findOutbound } from "../utils";
import {
  filterSingboxOutbounds,
  filterSingboxTags,
  makeRemoteRuleSet,
} from "./utils";

export const TEMPLATE: Singbox = {
  log: { level: "warn" },
  dns: {
    servers: [
      // `8.8.8.8` is often hijacked
      { tag: DnsTag.LOCAL, address: "8.8.8.8", detour: OutboundTag.DIRECT },
      // 1.1.1.1 does not send EDNS Client Subnet header
      // so use 8.8.8.8 instead
      {
        tag: DnsTag.PROXY,
        address: "https://8.8.8.8/dns-query",
        detour: OutboundTag.PROXY,
      },
    ],
    rules: [
      { outbound: ["any"], server: DnsTag.LOCAL },
      { rule_set: [GeositeTag.PRIVATE], server: DnsTag.LOCAL },
      { clash_mode: ClashMode.DIRECT, server: DnsTag.LOCAL },
      { clash_mode: ClashMode.GLOBAL, server: DnsTag.PROXY },
      { rule_set: [GeositeTag.CN], server: DnsTag.LOCAL },
      {
        type: "logical",
        mode: "and",
        rules: [
          { rule_set: [GeoipTag.CN] },
          { rule_set: [GeositeTag.PROXY], invert: true },
        ],
        server: DnsTag.PROXY,
        client_subnet: "101.6.6.6",
      },
    ],
    final: DnsTag.PROXY,
    independent_cache: true,
  },
  inbounds: [
    {
      type: "mixed",
      tag: InboundTag.MIXED,
      listen: "0.0.0.0",
      listen_port: 5353,
    },
  ],
  outbounds: [
    { type: "direct", tag: OutboundTag.DIRECT },
    { type: "selector", tag: OutboundTag.PROXY, outbounds: [] },
  ],
  route: {
    rules: [
      { action: "sniff" },
      { port: [53], action: "hijack-dns" },
      { protocol: ["dns"], action: "hijack-dns" },
      { ip_is_private: true, outbound: OutboundTag.DIRECT },
      { rule_set: [RulesetTag.PRIVATE], outbound: OutboundTag.DIRECT },
      { clash_mode: ClashMode.DIRECT, outbound: OutboundTag.DIRECT },
      { clash_mode: ClashMode.GLOBAL, outbound: OutboundTag.PROXY },
      { rule_set: [RulesetTag.CN], outbound: OutboundTag.DIRECT },
      { rule_set: [RulesetTag.AI], outbound: OutboundTag.AI },
      { rule_set: [RulesetTag.DOWNLOAD], outbound: OutboundTag.DOWNLOAD },
      { rule_set: [RulesetTag.EMBY], outbound: OutboundTag.EMBY },
      { rule_set: [RulesetTag.MEDIA], outbound: OutboundTag.MEDIA },
    ],
    rule_set: [
      makeRemoteRuleSet("geoip", "cn"),
      makeRemoteRuleSet("geosite", "ads"),
      makeRemoteRuleSet("geosite", "cn"),
      makeRemoteRuleSet("geosite", "private"),
      makeRemoteRuleSet("geosite", "proxy"),
      makeRemoteRuleSet("rule-set", "ads"),
      makeRemoteRuleSet("rule-set", "ai"),
      makeRemoteRuleSet("rule-set", "cn"),
      makeRemoteRuleSet("rule-set", "download"),
      makeRemoteRuleSet("rule-set", "emby"),
      makeRemoteRuleSet("rule-set", "media"),
      makeRemoteRuleSet("rule-set", "private"),
      makeRemoteRuleSet("rule-set", "proxy"),
    ],
    final: OutboundTag.PROXY,
    auto_detect_interface: true,
    // TODO: since sing-box 1.12.0
    // default_domain_resolver: {
    //   server: DnsTag.LOCAL,
    // },
  },
  experimental: {
    cache_file: {
      enabled: true,
      store_rdrc: true,
    },
    clash_api: {
      external_controller: "127.0.0.1:9090",
      external_ui: "ui",
      external_ui_download_url: "https://api.liblaf.me/assets/metacubexd.zip",
      external_ui_download_detour: OutboundTag.DIRECT,
    },
  },
};

export const DEFAULT: GeneratorSingbox = {
  generate(
    providers: Map<string, Singbox>,
    options: GeneratorSingboxOptions,
  ): Singbox {
    const singbox: Singbox = R.clone(TEMPLATE);
    const inbound = findInbound(singbox, InboundTag.MIXED)! as InboundMixed;
    inbound.listen_port = options.port;

    const groups: ProxyGroup[] = defaultGroups();
    const proxy = findOutbound(singbox, OutboundTag.PROXY) as OutboundSelector;

    for (const group of groups) {
      const outbound: OutboundSelector | OutboundUrltest = findOrCreateGroup(
        singbox,
        group,
      );
      outbound.outbounds = filterSingboxTags(providers, group.filter);
      proxy.outbounds.push(group.name);
    }
    singbox.outbounds!.push(
      ...filterSingboxOutbounds(providers, SELECT.filter),
    );
    return sanitize(singbox);
  },
};
