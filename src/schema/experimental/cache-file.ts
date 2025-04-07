import { z } from "zod";

export const EXPERIMENTAL_CACHE_FILE = z
  .object({
    enabled: z.boolean(),
    store_rdrc: z.boolean(),
  })
  .partial();
