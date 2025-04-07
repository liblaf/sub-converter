import type { Provider } from "@lib/provider";
import type { Outbound } from "@lib/schema";
import * as R from "remeda";
import type { Country } from "world-countries";
import { inferCountry } from "./country";

export class ProviderOutbound {
  public readonly provider: Provider;
  private readonly _outbound: Outbound;

  constructor(provider: Provider, outbound: Outbound) {
    this.provider = provider;
    this._outbound = outbound;
  }

  get ai(): boolean {
    const AI_EXCLUDE_COUNTRY = new Set(["CN", "HK", "MO", "TW"]);
    const country: Country | undefined = this.country;
    if (!country) return false;
    if (AI_EXCLUDE_COUNTRY.has(country.cca2)) return false;
    return false;
  }

  get country(): Country | undefined {
    return inferCountry(this._outbound.tag);
  }

  get direct(): boolean {
    return !!this.tag.match(/直连/);
  }

  get dummy(): boolean {
    const DUMMY_GROUP_TYPES = new Set([
      "block",
      "direct",
      "dns",
      "selector",
      "urltest",
    ]);
    return DUMMY_GROUP_TYPES.has(this._outbound.type);
  }

  get emby(): boolean {
    return !!this.tag.match(/emby/i);
  }

  get outbound(): Outbound {
    const outbound: Outbound = R.clone(this._outbound);
    outbound.tag = this.tag;
    return outbound;
  }

  get rate(): number {
    if (this.provider.name === "JMS") return 0.0;
    const match = this._outbound.tag.match(/(([0-9]*[.])?[0-9]+)x/i);
    if (match) return Number.parseFloat(match[1]);
    return 1.0;
  }

  get tag(): string {
    return `${this._outbound.tag} [${this.provider.name}]`;
  }
}
