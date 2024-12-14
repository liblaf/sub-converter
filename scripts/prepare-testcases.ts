import type { Outbound } from "@/client/sing-box/types";
import { subconvert } from "@/utils";
import type { BunFile } from "bun";
import { $ } from "bun";

type TestCase = {
  uri: string;
  singbox?: Outbound;
};

const TESTCASES_PATH = "data/testcases.json";

async function prepare(uri: string): Promise<TestCase> {
  const testcase: TestCase = { uri };
  try {
    testcase.singbox = JSON.parse(
      await subconvert("singbox", uri),
    ).outbounds[0];
  } catch (error) {
    console.error(`Failed to prepare: ${uri}`);
    console.error(error);
  }
  return testcase;
}

async function main(): Promise<void> {
  const file: BunFile = Bun.file("data/uri.txt");
  const text: string = await file.text();
  const uris: string[] = text
    .split("\n")
    .map((s: string): string => s.trim())
    .filter((s: string) => s && !s.startsWith("#"));
  const cases: TestCase[] = await Promise.all(
    uris.map((uri: string) => prepare(uri)),
  );
  await Bun.write(TESTCASES_PATH, JSON.stringify(cases, undefined, 2), {
    createPath: true,
  });
  await $`prettier --write ${TESTCASES_PATH}`;
}

await main();
