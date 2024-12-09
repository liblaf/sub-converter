import * as R from "remeda";

export type Log = {
  disabled?: boolean;
  level?: "trace" | "debug" | "info" | "warn" | "error" | "fatal" | "panic";
  output?: string;
  timestamp?: boolean;
};

export function defineLog(log: Partial<Log> = {}): Log {
  return R.mergeDeep({ disabled: false, level: "warn", timestamp: false }, log);
}
