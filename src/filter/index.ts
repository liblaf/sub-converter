export {
  ClashMode,
  DnsTag,
  GeoipTag,
  GeositeTag,
  InboundTag,
  OutboundTag,
  RulesetTag,
} from "./constants";
export {
  AI,
  AUTO,
  BALANCED,
  defaultGroups,
  DOWNLOAD,
  EMBY,
  GROUPS,
  makeCountryGroup,
  MEDIA,
  SELECT,
} from "./group";
export {
  FLAGS,
  inferCountry,
  inferRate,
  isCountry,
  isEmby,
  isExcluded,
  isLimit,
} from "./infer";
export { renameTag } from "./preprocess";
export type { ProxyGroup } from "./types";
