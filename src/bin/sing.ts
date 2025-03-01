import * as pkg from "@/package.json";
import {
  GENERATOR_OPTIONS_SCHEMA,
  type GeneratorSingbox,
  type GeneratorSingboxOptions,
  type Singbox,
  fetchSingboxFromProviders,
  getGenerator,
} from "@lib/client/sing-box";
import { CONFIG_SCHEMA, type Config } from "@lib/provider";
import { type Command, type OptionValues, createCommand } from "commander";
import { z } from "zod";

function parsePort(value: string): number {
  const PORT_SCHEMA = z.coerce.number().int().min(0).max(65535);
  const result: number = PORT_SCHEMA.parse(value);
  return result;
}

function parse(): OptionValues {
  const program: Command = createCommand();
  program
    .version(pkg.version)
    .requiredOption("-c, --config <FILE>", "", "config.json")
    .requiredOption("-g, --generator <NAME>", "", "default")
    .requiredOption("-o, --output <FILE>", "", "sing-box.json")
    .requiredOption("-p, --port <PORT>", "", parsePort);
  program.parse();
  return program.opts();
}

async function main(): Promise<void> {
  const opts: OptionValues = parse();
  const config: Config = CONFIG_SCHEMA.parse(
    await Bun.file(opts.config).json(),
  );
  const providers: Map<string, Singbox> = await fetchSingboxFromProviders(
    config.providers,
  );
  const generator: GeneratorSingbox = getGenerator(opts.generator);
  const options: GeneratorSingboxOptions = GENERATOR_OPTIONS_SCHEMA.parse({
    port: opts.port,
  });
  const singbox: Singbox = generator.generate(providers, options);
  await Bun.file(opts.output).write(JSON.stringify(singbox));
}

await main();
