export { makeDefaultConfig } from "./default";
export { makeIosConfig } from "./ios";
export { TEMPLATE_OPTIONS_SCHEMA } from "./types";
export type { Template, TemplateOptions } from "./types";

import { makeDefaultConfig } from "./default";
import { makeIosConfig } from "./ios";
import type { Template } from "./types";

export const TEMPLATES: Record<string, Template> = {
  DEFAULT: makeDefaultConfig,
  IOS: makeIosConfig,
};

export function getTemplate(name: string): Template {
  return TEMPLATES[name.toUpperCase()];
}
