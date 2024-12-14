export function inferRate(name: string): number {
  const match = name.match(/(([0-9]*[.])?[0-9]+)x/i);
  if (match) return Number.parseFloat(match[1]);
  if (name.match(/c\d+s\d+/)) {
    // JMS
    return 0;
  }
  return 1.0;
}

export function isExcluded(name: string): boolean {
  return !!name.match(/到期|剩余|套餐|网址|过期/);
}

export function isEmby(name: string): boolean {
  return !!name.match(/emby/i);
}

export function isLimit(name: string): boolean {
  return !!name.match(/限速/i);
}
