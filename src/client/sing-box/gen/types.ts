import { z } from "zod";
import { PORT, type Singbox } from "../schema";

export const GENERATOR_OPTIONS_SCHEMA = z.object({ port: PORT.default(5353) });

export type GeneratorSingboxOptions = z.infer<typeof GENERATOR_OPTIONS_SCHEMA>;

export type GeneratorSingbox = {
  generate(
    providers: Map<string, Singbox>,
    options: GeneratorSingboxOptions,
  ): Singbox;
};
