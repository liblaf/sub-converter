import type { Template } from "../typed";
import { DEFAULT } from "./default";
import { IOS } from "./ios";

export { DEFAULT } from "./default";
export { IOS } from "./ios";

export const GENERATORS: Record<string, Template> = {
  default: DEFAULT,
  ios: IOS,
};

export function template(name = "default"): Template {
  return GENERATORS[name];
}
