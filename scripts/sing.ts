import { CONFIG_SCHEMA, type Config, fetchSingboxFromProviders } from "@lib";
import type { GeneratorSingboxOptions } from "@lib/client/sing-box";
import {
  GENERATORS,
  GENERATOR_OPTIONS_SCHEMA,
  type Singbox,
} from "@lib/client/sing-box";
import type { BunFile } from "bun";
import { Command, type OptionValues } from "commander";
import * as path from "node:path";
import { z } from "zod";

function parseArgs(): OptionValues {
  const program = new Command();
  program
    .option("-c, --config <path>", "", ".private/config.json")
    .option("-o, --output <path>", "", ".private/")
    .option("-p, --port <PORT>", "", parsePort);
  program.parse(process.argv);
  return program.opts();
}

function parsePort(value: string): number {
  const PORT_SCHEMA = z.coerce.number().int().min(0).max(65535);
  const port: number = PORT_SCHEMA.parse(value);
  return port;
}

async function main() {
  const opts: OptionValues = parseArgs();
  const configFile: BunFile = Bun.file(opts.config);
  const config: Config = CONFIG_SCHEMA.parse(await configFile.json());
  const providers: Map<string, Singbox> = await fetchSingboxFromProviders(
    config.providers,
  );
  const options: GeneratorSingboxOptions = GENERATOR_OPTIONS_SCHEMA.parse({
    port: opts.port,
  });

  for (const [name, generator] of Object.entries(GENERATORS)) {
    const singbox: Singbox = generator.generate(providers, options);
    const filename: string =
      name === "default" ? "sing-box.json" : `sing-box.${name}.json`;
    const output: BunFile = Bun.file(path.join(opts.output, filename));
    await output.write(JSON.stringify(singbox));
  }
}

await main();
