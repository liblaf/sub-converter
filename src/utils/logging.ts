import pino from "pino";

export function newLogger() {
  return pino({
    level: "debug",
    transport: {
      target: "pino-pretty",
    },
  });
}
