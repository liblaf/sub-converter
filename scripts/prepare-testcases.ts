import type { Outbound } from "@/sing-box/types";
import type { BunFile } from "bun";
import { $ } from "bun";

type TestCase = {
  uri: string;
  singbox: Outbound;
};

const TESTCASES_PATH = "data/testcases.json";

async function subconvert(target: string, uri: string): Promise<string> {
  const url = new URL("https://url.v1.mk/sub");
  url.searchParams.set("target", target);
  url.searchParams.set("url", uri);
  url.searchParams.set("list", "true");
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Failed to convert: ${uri}`);
  }
  const text = await resp.text();
  return text;
}

async function prepare(uri: string): Promise<TestCase> {
  return {
    uri,
    singbox: JSON.parse(await subconvert("singbox", uri)).outbounds[0],
  };
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
