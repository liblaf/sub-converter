import { fetchUnsafe } from "@/utils";
import { addDays, format } from "date-fns";
import type { SubscriptionUserinfo } from "../types";

export async function fetchClashInfo({
  url,
  ua,
}: { url: string; ua?: string }): Promise<SubscriptionUserinfo> {
  const resp: Response = await fetchUnsafe(url, {
    method: "HEAD",
    headers: { "User-Agent": ua ?? "clash.meta" },
  });
  const header: string | null = resp.headers.get("Subscription-Userinfo");
  const info: SubscriptionUserinfo = parseSubInfo(header);
  return info;
}

function parseSubInfo(
  header?: string | null,
  names?: string[],
): SubscriptionUserinfo {
  const info: SubscriptionUserinfo = {};
  if (header) Object.assign(info, parseHeader(header));
  if (names) Object.assign(info, parseNames(names));
  return info;
}

function parseHeader(header: string | null): SubscriptionUserinfo {
  const info: SubscriptionUserinfo = {};
  if (!header) return info;
  const items = header.split(";").map((item) => item.trim());
  for (const item of items) {
    if (!item) continue;
    const [key, value] = item.split("=").map((item) => item.trim());
    if (!(key && value)) continue;
    if (
      key === "upload" ||
      key === "download" ||
      key === "total" ||
      key === "expire"
    ) {
      info[key] = Number.parseInt(value);
    }
  }
  return info;
}

function parseNames(names: string[]): SubscriptionUserinfo {
  const info: SubscriptionUserinfo = {};
  for (const name of names) {
    const match = name.match(/距离下次重置剩余：(?<days>\d+) 天/);
    if (match?.groups?.days) {
      const today = new Date();
      const date = addDays(today, Number.parseInt(match.groups.days));
      info.reset_date = format(date, "yyyy-MM-dd");
    }
  }
  return info;
}
