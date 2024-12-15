export { makeDefaultConfig } from "./default";
export { makeIosConfig } from "./ios";
export { TEMPLATE_OPTIONS_SCHEMA } from "./types";
export type { TemplateOptions } from "./types";

import { makeDefaultConfig } from "./default";
import { makeIosConfig } from "./ios";
import type { TemplateFactory } from "./types";

export const TEMPLATES: Record<string, TemplateFactory> = {
  DEFAULT: makeDefaultConfig,
  IOS: makeIosConfig,
};

export function getTemplateFactory(name: string): TemplateFactory {
  return TEMPLATES[name.toUpperCase()];
}
