import { CONFIG_SCHEMA, type Config, fetchSingboxFromProviders } from "@lib";
import type { GeneratorSingboxOptions } from "@lib/client/sing-box";
import {
  DEFAULT,
  GENERATOR_OPTIONS_SCHEMA,
  type Singbox,
} from "@lib/client/sing-box";

async function main() {
  const CONFIG_FILE = Bun.file(".private/config.json");
  const config: Config = CONFIG_SCHEMA.parse(await CONFIG_FILE.json());
  const providers: Map<string, Singbox> = await fetchSingboxFromProviders(
    config.providers,
  );
  const options: GeneratorSingboxOptions = GENERATOR_OPTIONS_SCHEMA.parse({});
  const singbox: Singbox = DEFAULT.generate(providers, options);
  await Bun.file(".private/sing-box.json").write(JSON.stringify(singbox));
}

await main();
