import pino from "pino";
import PinoPretty from "pino-pretty";

export function newLogger() {
  return pino({ level: "debug" }, PinoPretty());
}
