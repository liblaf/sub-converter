import { type CommandContext, buildCommand } from "@stricli/core";
import YAML from "yaml";
import { SCHEMA_PORT, genMihomo } from "../gen";
import { groups } from "../group";
import { type ProxyNode, inferMihomo } from "../infer";
import { type MihomoProxy, Profile, type ProfileOptions } from "../provider";

interface Flags {
  emoji: boolean;
  icon: boolean;
  output: string;
  port: number;
  profile: Profile;
  template: string;
}

export const mihomo = buildCommand({
  async func(
    this: CommandContext,
    { emoji, icon, output, port, profile, template }: Flags,
  ): Promise<void> {
    const nodes: ProxyNode[] = [];
    for (const provider of profile.providers) {
      const proxies: MihomoProxy[] = await provider.fetchMihomo();
      nodes.push(...inferMihomo(provider, proxies));
    }
    const config: string = genMihomo(template, nodes, groups(), {
      emoji,
      icon,
      port,
    });
    await Bun.write(output, config);
  },
  parameters: {
    flags: {
      emoji: {
        kind: "boolean",
        brief: "emoji",
        default: false,
      },
      icon: {
        kind: "boolean",
        brief: "icon",
        default: true,
      },
      output: {
        kind: "parsed",
        parse: String,
        brief: "output",
        default: "config.yaml",
      },
      port: {
        kind: "parsed",
        parse: SCHEMA_PORT.parse,
        brief: "port",
        default: "7892",
      },
      profile: {
        kind: "parsed",
        parse: async (profile: string): Promise<Profile> => {
          const text: string = await Bun.file(profile).text();
          const options: ProfileOptions = YAML.parse(text);
          return new Profile(options);
        },
        brief: "profile",
        default: "profile.yaml",
      },
      template: {
        kind: "parsed",
        parse: async (template: string): Promise<string> => {
          return await Bun.file(template).text();
        },
        brief: "template",
        default: "templates/mihomo/default.yaml",
      },
    },
  },
  docs: {
    brief: "mihomo",
  },
});
