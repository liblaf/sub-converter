export type RuleSet = RuleSetRemote;

export type RuleSetRemote = {
  type: "remote";
  tag: string;
  format: "source" | "binary";
  url: string;
  download_detour?: string;
  update_interval?: string;
};
