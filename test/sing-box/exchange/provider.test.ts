import type { Outbound } from "@lib/client/sing-box";
import { singboxFromBase64 } from "@lib/client/sing-box";
import { subconvert } from "@lib/utils";
import { fetchUnsafe } from "@liblaf/utils";
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
