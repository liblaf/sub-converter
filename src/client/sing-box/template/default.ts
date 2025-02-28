import type { Outbound, Singbox } from "@liblaf/sing-box-schema";
import * as R from "remeda";
import type { Template, TemplateOptions } from "./types";

export const DEFAULT: Template = {
  execute(
    providers: Map<string, Outbound[]>,
    options: TemplateOptions,
  ): Singbox {
    const cfg: Singbox = R.clone({});
    // TODO: implement template
    return cfg;
  },
};
