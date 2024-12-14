import { singboxFromBase64 } from "@/client/sing-box/exchange";
import { subconvert } from "@/utils";
import { expect, test } from "vitest";

test.skipIf(!process.env.SUB_URL)("sing-box", async () => {
  const sub: string = process.env.SUB_URL!;
  const resp = await fetch(sub);
  if (!resp.ok)
    throw new Error(`Failed to fetch: ${sub}\n${await resp.text()}`);
  const text = await resp.text();
  const received = singboxFromBase64(text);
  const expected = JSON.parse(await subconvert("singbox", sub)).outbounds;
  expect(received).toStrictEqual(expected);
});
