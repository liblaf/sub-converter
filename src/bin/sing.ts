#!/usr/bin/env bun

import { fetchSingbox } from "@lib/fetch";
import {
  TEMPLATE_OPTIONS,
  type Template,
  type TemplateOptions,
  sanitize,
  template,
} from "@lib/gen";
import type { ProviderOutbound } from "@lib/outbound";
import { CONFIG, type Config } from "@lib/provider";
import type { Singbox } from "@lib/schema";
import { getLogger } from "@lib/utils";
import chalk from "chalk";
import { Command } from "commander";
import { z } from "zod";

function parsePort(value: string, _previous: any): number {
  return z.coerce.number().int().min(0).max(65535).parse(value);
}

const program = new Command("sing");
program
  .configureHelp({
    styleArgumentText: chalk.cyanBright,
    styleCommandText: chalk.bold.cyanBright,
    styleOptionTerm: chalk.bold.cyanBright,
    styleOptionText: chalk.cyanBright,
    styleSubcommandText: chalk.cyanBright,
    styleTitle: chalk.bold.greenBright,
  })
  .option("-c, --config <file>", "", "config.json")
  .option("-d, --debug", "", false)
  .option("-o, --output <file>", "", "sing-box.json")
  .option("-p, --port <port>", "", parsePort, 5353)
  .option("-t, --template <default|ios>", "", "default")
  .action(async (options): Promise<void> => {
    const logger = getLogger();
    const config: Config = CONFIG.parse(await Bun.file(options.config).json());
    const outbounds: ProviderOutbound[] = (
      await fetchSingbox(config.providers)
    ).filter((o: ProviderOutbound): boolean => !o.dummy);
    if (options.debug) {
      for (const outbound of outbounds) {
        logger.debug(outbound.pretty);
      }
    }
    const generator: Template = template(options.template);
    const templateOptions: TemplateOptions = TEMPLATE_OPTIONS.parse({
      port: options.port,
    });
    const generated: Singbox = generator.generate(outbounds, templateOptions);
    const singbox: Singbox = sanitize(generated);
    await Bun.write(options.output, JSON.stringify(singbox));
  });

program.parse();
