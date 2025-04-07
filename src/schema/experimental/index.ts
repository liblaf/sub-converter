import { z } from "zod";
import { EXPERIMENTAL_CACHE_FILE } from "./cache-file";
import { EXPERIMENTAL_CLASH_API } from "./clash-api";

export const EXPERIMENTAL = z
  .object({
    cache_file: EXPERIMENTAL_CACHE_FILE,
    clash_api: EXPERIMENTAL_CLASH_API,
  })
  .partial();
