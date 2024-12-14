import { singboxFromUri } from "@/client/sing-box/exchange";
import TESTCASES from "@data/testcases.json";
import { expect, test } from "vitest";

TESTCASES.filter(({ singbox }) => singbox).map(({ uri, singbox }) => {
  test(`singbox From URI (${singbox!.tag})`, () => {
    expect(singboxFromUri(uri)).toStrictEqual(singbox);
  });
});
