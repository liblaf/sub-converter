import { z } from "zod";

export const SUBSCRIPTION_USERINFO_SCHEMA = z
  .object({
    name: z.string().optional(),
    url: z.string().optional(),
    upload: z.number().int(),
    download: z.number().int(),
    total: z.number().int(),
    expire: z.number().int(),
    reset_date: z.string().date(),
    reset_day_of_month: z.number().int(),
    error: z.string().optional(),
  })
  .partial();

export type SubscriptionUserinfo = z.infer<typeof SUBSCRIPTION_USERINFO_SCHEMA>;
