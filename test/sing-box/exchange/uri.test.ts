import TESTCASES from "@data/testcases.json";
import { singboxFromUri } from "@lib/client/sing-box/exchange";
import { expect, test } from "vitest";

TESTCASES.filter(({ singbox }) => singbox).map(({ uri, singbox }) => {
  test(`singbox From URI (${singbox!.tag})`, () => {
    expect(singboxFromUri(uri)).toStrictEqual(singbox);
  });
});
