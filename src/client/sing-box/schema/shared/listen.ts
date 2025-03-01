import { z } from "zod";
import { PORT } from "../rule-set/headless-rule";

export const SHARED_LISTEN = z
  .object({
    listen: z.string().ip(),
    listen_port: PORT,
  })
  .partial()
  .required({ listen: true });
