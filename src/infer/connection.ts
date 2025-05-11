import geoip from "geoip-lite";
import type { NodeInfo } from "./typed";
export enum Connection {
  UNKNOWN = "unknown",
  DIRECT = "direct",
  TRANSIT = "transit",
}

export function connection(node: NodeInfo): Connection {
  if (node.server) {
    const conn: Connection | undefined = connectionByIp(node.server);
    if (conn) return conn;
  }
  const conn: Connection | undefined = connectionByName(node.name);
  if (conn) return conn;
  return Connection.UNKNOWN;
}

function connectionByIp(ip: string): Connection | undefined {
  const geo: geoip.Lookup | null = geoip.lookup(ip);
  if (!geo) return undefined;
  if (geo.country === "CN") return Connection.TRANSIT;
  return Connection.DIRECT;
}

function connectionByName(name: string): Connection | undefined {
  if (name.match(/直连/i)) return Connection.DIRECT;
  if (name.match(/中转/i)) return Connection.TRANSIT;
  return undefined;
}
