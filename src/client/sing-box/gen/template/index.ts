import type { GeneratorSingbox } from "../types";
import { DEFAULT } from "./default";
import { IOS } from "./ios";

export { DEFAULT } from "./default";
export { IOS } from "./ios";

export const GENERATORS: Record<string, GeneratorSingbox> = {
  default: DEFAULT,
  ios: IOS,
};

export function getGenerator(name = "default"): GeneratorSingbox {
  return GENERATORS[name];
}
