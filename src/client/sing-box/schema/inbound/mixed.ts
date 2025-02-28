import { z } from "zod";
import { SHARED_LISTEN } from "../shared";

export const INBOUND_MIXED = z
  .object({
    type: z.literal("mixed"),
    tag: z.string(),
  })
  .merge(SHARED_LISTEN)
  .partial()
  .required({ type: true, tag: true });
