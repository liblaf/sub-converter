export function renameTag(tag: string): string {
  const match = tag.match(/@(?<name>[\w-]+)/);
  if (match) {
    // JMS
    let result = match.groups?.name ?? tag;
    if (result.match(/s1|s2|s3/)) result = `🇺🇸 ${result}`;
    if (result.match(/s4/)) result = `🇯🇵 ${result}`;
    if (result.match(/s5/)) result = `🇳🇱 ${result}`;
    return result;
  }
  return tag;
}
