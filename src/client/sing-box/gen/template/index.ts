import type { GeneratorSingbox } from "../types";
import { DEFAULT } from "./default";

export { DEFAULT } from "./default";

const GENERATORS: Record<string, GeneratorSingbox> = {
  default: DEFAULT,
};

export function generator(name = "default"): GeneratorSingbox {
  return GENERATORS[name];
}
