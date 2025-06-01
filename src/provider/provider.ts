import { z } from "zod";
import { subconvert } from "../utils";
import { type MihomoProxy, fetchMihomo } from "./mihomo";

export const SCHEMA_PROVIDER: z.ZodObject<{
  name: z.ZodString;
  base64: z.ZodOptional<
    z.ZodObject<{ url: z.ZodString; ua: z.ZodOptional<z.ZodString> }>
  >;
  mihomo: z.ZodOptional<
    z.ZodObject<{ url: z.ZodString; ua: z.ZodDefault<z.ZodString> }>
  >;
}> = z.object({
  name: z.string(),
  base64: z
    .object({
      url: z.string().url(),
      ua: z.string().optional(),
    })
    .optional(),
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

  get base64(): { url: string; ua?: string } | undefined {
    return this._options.base64;
  }

  get mihomo(): { url: string; ua: string } | undefined {
    return this._options.mihomo;
  }

  async fetchMihomo(): Promise<MihomoProxy[]> {
    if (!this._mihomo) {
      if (this.mihomo) {
        this._mihomo = await fetchMihomo(this.mihomo.url, this.mihomo.ua);
      } else if (this.base64) {
        this._mihomo = await fetchMihomo(
          subconvert(this.base64.url, "clash"),
          this.base64.ua,
        );
      } else {
        throw new Error("No Mihomo URL provided in provider options.");
      }
    }
    return this._mihomo;
  }
}
