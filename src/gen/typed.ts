import type { ProviderOutbound } from "@lib/outbound";
import { PORT, type Singbox } from "@lib/schema";
import { z } from "zod";

export const TEMPLATE_OPTIONS = z.object({ port: PORT.default(5353) });
export type TemplateOptions = z.infer<typeof TEMPLATE_OPTIONS>;

export type Template = {
  generate(outbounds: ProviderOutbound[], options: TemplateOptions): Singbox;
};
