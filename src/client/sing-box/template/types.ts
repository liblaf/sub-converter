import { type Outbound, PORT, type Singbox } from "@liblaf/sing-box-schema";
import { z } from "zod";

export const TEMPLATE_OPTIONS_SCHEMA = z.object({
  port: PORT.default(0),
});

export type TemplateOptions = z.infer<typeof TEMPLATE_OPTIONS_SCHEMA>;

export type Template = {
  execute(
    providers: Map<string, Outbound[]>,
    options: TemplateOptions,
  ): Singbox;
};
