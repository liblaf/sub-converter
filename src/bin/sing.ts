#!/usr/bin/env bun

import { version } from "@/package.json";
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
import { Builtins, Cli, Command, Option } from "clipanion";

import * as t from "typanion";

export class Sing extends Command {
  static paths = [Command.Default];
  static usage = Command.Usage({});
  config: string = Option.String("-c,--config", "config.json");
  output: string = Option.String("-o,--output", "sing-box.json");
  port: number = Option.String("-p,--port", "5353", {
    validator: t.isNumber(),
  });
  template: string = Option.String("-t,--template", "default");
  async execute(): Promise<void> {
    const config: Config = CONFIG.parse(await Bun.file(this.config).json());
    const outbounds: ProviderOutbound[] = (
      await fetchSingbox(config.providers)
    ).filter((o: ProviderOutbound): boolean => !o.dummy);
    const generator: Template = template(this.template);
    const options: TemplateOptions = TEMPLATE_OPTIONS.parse({
      port: this.port,
    });
    const generated: Singbox = generator.generate(outbounds, options);
    const singbox: Singbox = sanitize(generated);
    await Bun.write(this.output, JSON.stringify(singbox));
  }
}

const cli = new Cli({
  binaryLabel: "Sing",
  binaryName: "sing",
  binaryVersion: version,
});
cli.register(Builtins.DefinitionsCommand);
cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);
cli.register(Sing);
cli.runExit(process.argv.slice(2));
