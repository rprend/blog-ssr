import { linkEntries, type LinkEntry } from "./links-data";

export type { LinkEntry };

export async function getLinkEntries(): Promise<LinkEntry[]> {
  return linkEntries;
}
