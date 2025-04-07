import { type ILogObj, Logger } from "tslog";

export function getLogger(): Logger<ILogObj> {
  return new Logger();
}
