import type { Outbound } from "@/client/sing-box";
import { singboxFromBase64 } from "@/client/sing-box";
import { fetchUnsafe, subconvert } from "@/utils";
import { expect, test } from "vitest";

test.skipIf(!process.env.SUB_URL)("sing-box", async () => {
  const sub: string = process.env.SUB_URL!;
  const resp: Response = await fetchUnsafe(sub);
  const text: string = await resp.text();
  const received: Outbound[] = singboxFromBase64(text);
  const expected: Outbound[] = JSON.parse(
    await subconvert("singbox", sub),
  ).outbounds;
  expect(received).toStrictEqual(expected);
});
