// ref: <https://github.com/bloomberg/stricli/blob/beb8584382948ab8898e973d6a13dbbc21d274cb/packages/create-app/src/files.ts#L48-L68>

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { StricliAutoCompleteContext } from "@stricli/auto-complete";
import type { CommandContext } from "@stricli/core";

export interface LocalContext
  extends CommandContext,
    StricliAutoCompleteContext {
  readonly process: NodeJS.Process;
  // ...
}

export function buildContext(process: NodeJS.Process): LocalContext {
  return {
    process,
    os,
    fs,
    path,
  };
}
