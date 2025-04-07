import type { Provider } from "@lib/provider";
import type { Outbound } from "@lib/schema";
import * as R from "remeda";
import type { Country } from "world-countries";
import { inferCountry, inferDirect } from "./country";
export class ProviderOutbound {
  public readonly provider: Provider;
  private readonly _outbound: Outbound;
  private _country: Country | null | undefined = undefined;

  constructor(provider: Provider, outbound: Outbound) {
    this.provider = provider;
    this._outbound = outbound;
  }

  get ai(): boolean {
    const AI_EXCLUDE_COUNTRY = new Set(["CN", "HK", "MO", "TW"]);
    const country: Country | null = this.country;
    if (!country) return false;
    if (AI_EXCLUDE_COUNTRY.has(country.cca2)) return false;
    return true;
  }

  get country(): Country | null {
    if (this._country === undefined)
      this._country = inferCountry(this._outbound);
    return this._country;
  }

  get direct(): boolean {
    const direct: boolean = inferDirect(this._outbound);
    return direct;
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

  get info(): boolean {
    return !!this.tag.match(/到期|剩余|套餐/i);
  }

  get outbound(): Outbound {
    const outbound: Outbound = R.clone(this._outbound);
    outbound.tag = this.tag;
    return outbound;
  }

  get pretty(): string {
    let result = `${this.tag} -> `;
    const country: Country | null = this.country;
    const prettyCountry: string = country
      ? `${country.flag} ${country.name.common}`
      : "🏳️‍🌈 Unknown";
    result += prettyCountry;
    result += this.direct ? " [Direct]" : " [Transit]";
    result += ` [${this.rate}x]`;
    return result;
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
