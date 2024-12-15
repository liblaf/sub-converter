import { fetchUnsafe, jmsSubInfoUrl } from "@/utils";
import { z } from "zod";
import type { SubscriptionUserinfo } from "../types";

const BW_COUNTER_SCHEMA = z.object({
  bw_counter_b: z.number().int(),
  bw_reset_day_of_month: z.number().int(),
  monthly_bw_limit_b: z.number().int(),
});

type BWCounter = z.infer<typeof BW_COUNTER_SCHEMA>;

export async function fetchJmsInfo({
  service,
  id,
}: {
  service: string;
  id: string;
}): Promise<SubscriptionUserinfo> {
  const url = jmsSubInfoUrl({ service, id });
  const resp: Response = await fetchUnsafe(url);
  const bwCounter: BWCounter = BW_COUNTER_SCHEMA.parse(await resp.json());
  return {
    upload: 0,
    download: bwCounter.bw_counter_b,
    total: bwCounter.monthly_bw_limit_b,
    reset_day_of_month: bwCounter.bw_reset_day_of_month,
  };
}
