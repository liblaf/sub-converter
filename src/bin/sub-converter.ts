#!/usr/bin/env bun

import { run } from "@stricli/core";
import { app, buildContext } from "../cli";

await run(app, process.argv.slice(2), buildContext(process));
