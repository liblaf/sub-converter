import type { Country } from "world-countries";
import type { MihomoProxy, Provider } from "../provider";
import { type Connection, connection } from "./connection";
import { emby } from "./misc";
import { rate } from "./rate";
import { region } from "./region";
import type { NodeInfo } from "./typed";

export type NodeOptions = {
  provider: Provider;
  mihomo?: MihomoProxy;
};

export class ProxyNode {
  public provider: Provider;
  public _mihomo?: MihomoProxy;
  private _connection?: Connection;
  private _region?: Country;
  private _emby?: boolean;
  private _rate?: number;

  constructor(options: NodeOptions) {
    this.provider = options.provider;
    this._mihomo = options.mihomo;
  }

  get name(): string {
    return `[${this.provider.name}]${this._name}`;
  }

  get server(): string | undefined {
    if (this._mihomo) return this._mihomo.server;
    return undefined;
  }

  get mihomo(): MihomoProxy {
    const mihomo: MihomoProxy = { ...this._mihomo! };
    mihomo.name = this.name;
    return mihomo;
  }

  get connection(): Connection {
    if (!this._connection) this._connection = connection(this._node);
    return this._connection;
  }

  get emby(): boolean {
    if (this._emby === undefined) this._emby = emby(this._node);
    return this._emby;
  }

  get rate(): number {
    if (this._rate === undefined) this._rate = rate(this._node);
    return this._rate;
  }

  get region(): Country {
    if (!this._region) this._region = region(this._node);
    return this._region;
  }

  private get _name(): string {
    return this._mihomo!.name;
  }

  private get _node(): NodeInfo {
    return {
      name: this._name,
      provider: this.provider.name,
      server: this.server,
    };
  }
}

export function inferMihomo(
  provider: Provider,
  proxies: MihomoProxy[],
): ProxyNode[] {
  const nodes: ProxyNode[] = proxies.map(
    (proxy: MihomoProxy): ProxyNode =>
      new ProxyNode({ provider, mihomo: proxy }),
  );
  return nodes;
}
