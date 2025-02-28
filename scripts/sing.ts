import { CONFIG_SCHEMA, type Config, fetchSingboxFromProviders } from "@lib";
import type { Outbound } from "@liblaf/sing-box-schema";

async function main(): Promise<void> {
  const config: Config = CONFIG_SCHEMA.parse(
    await Bun.file(".private/config.json").json(),
  );
  const providers: Map<string, Outbound[]> = await fetchSingboxFromProviders(
    config.providers,
  );
  console.log(providers);
}

await main();
