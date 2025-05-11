import { Logger } from "tslog";
import YAML from "yaml";
import { z } from "zod";
import { get } from "../utils";

const logger = new Logger();

export const SCHEMA_MIMOHO_PROXY = z.object({
  name: z.string(),
  server: z.string(),
  type: z.string(),
});

export type MihomoProxy = z.infer<typeof SCHEMA_MIMOHO_PROXY>;

export type MihomoConfig = {
  proxies: MihomoProxy[];
};

export async function fetchMihomo(
  url: string,
  ua: string,
): Promise<MihomoProxy[]> {
  try {
    const resp: Response = await get(url, ua);
    const text: string = await resp.text();
    const config: MihomoConfig = YAML.parse(text);
    const proxies: MihomoProxy[] = config.proxies;
    return proxies;
  } catch (err) {
    logger.error(err);
    return [];
  }
}
