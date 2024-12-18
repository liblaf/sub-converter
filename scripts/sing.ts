import type {
  Config,
  Outbound,
  Template,
  TemplateOptions,
} from "@/client/sing-box";
import {
  TEMPLATE_OPTIONS_SCHEMA,
  fetchSingboxOutboundsFromProfile,
  getTemplate,
  sanitize,
} from "@/client/sing-box";
import { PROFILE_SCHEMA, type Profile } from "@/provider";

async function main(): Promise<void> {
  const profile: Profile = PROFILE_SCHEMA.parse(
    await Bun.file(".private/profile.json").json(),
  );
  const opts: TemplateOptions = TEMPLATE_OPTIONS_SCHEMA.parse({ port: 64393 });
  const providers: Map<string, Outbound[]> =
    await fetchSingboxOutboundsFromProfile(profile);
  const template: Template = getTemplate("default");
  const cfg: Config = sanitize(template(providers, opts));
  Bun.write(".private/config.json", JSON.stringify(cfg));
}

await main();
