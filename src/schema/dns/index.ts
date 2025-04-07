import { z } from "zod";
import { DNS_RULE } from "./rule";
import { DNS_SERVER } from "./server";

export const DNS = z
  .object({
    servers: z.array(DNS_SERVER),
    rules: z.array(DNS_RULE),
    final: z.string(),
    independent_cache: z.boolean(),
  })
  .partial();
