export {
  singboxFromBase64,
  singboxFromUri,
  singboxFromUriList,
} from "./exchange";
export {
  fetchSingboxOutbounds,
  fetchSingboxProviders,
  filterSingboxOutbounds,
  filterSingboxOutboundTags,
} from "./provider";
export {
  addGroup,
  getTemplateFactory,
  makeDefaultConfig,
  makeRemoteRuleset,
  sanitize,
  TEMPLATE_OPTIONS_SCHEMA,
  TEMPLATES,
} from "./template";
export type { TemplateOptions } from "./template";
export type {
  Config,
  Outbound,
  Route,
  RouteRule,
  RuleSet,
  RuleSetRemote,
} from "./types";
