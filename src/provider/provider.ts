import { z } from "zod";
import { type MihomoProxy, fetchMihomo } from "./mihomo";

export const SCHEMA_PROVIDER = z.object({
  name: z.string(),
  mihomo: z
    .object({
      url: z.string().url(),
      ua: z.string().default("clash.meta"),
    })
    .optional(),
});

export class Provider {
  private _options: z.infer<typeof SCHEMA_PROVIDER>;
  private _mihomo?: MihomoProxy[] = undefined;

  constructor(options: z.input<typeof SCHEMA_PROVIDER>) {
    this._options = SCHEMA_PROVIDER.parse(options);
  }

  get name(): string {
    return this._options.name;
  }

  get mihomo(): { url: string; ua: string } | undefined {
    return this._options.mihomo;
  }

  async fetchMihomo(): Promise<MihomoProxy[]> {
    if (!this._mihomo) {
      this._mihomo = await fetchMihomo(this.mihomo!.url, this.mihomo!.ua);
    }
    return this._mihomo;
  }
}
