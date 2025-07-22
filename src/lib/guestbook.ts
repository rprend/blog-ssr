export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  date: string;
  timestamp: number;
}

// Mock data for development
const mockEntries: GuestbookEntry[] = [
  {
    id: "guestbook_1734567890000",
    name: "Dimorgeus",
    message: "Wow I love this feature, so Brooklyn of you",
    date: "2025-01-19",
    timestamp: 1734567890000,
  },
  {
    id: "guestbook_1734567890001",
    name: "mirea",
    message: "hey ryan",
    date: "2025-01-28",
    timestamp: 1734567890001,
  },
  {
    id: "guestbook_1734567890002",
    name: "Teddy Li",
    message: "Love what you've done with the place very cozy",
    date: "2025-01-23",
    timestamp: 1734567890002,
  },
  {
    id: "guestbook_1734567890003",
    name: "ryan",
    message: "ryan was here first",
    date: "2025-01-05",
    timestamp: 1734567890003,
  },
];

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  "use server";

  console.log("getGuestbookEntries");
  if ((globalThis as any).env?.GUESTBOOK_DB) {
    try {
      const db = (globalThis as any).env.GUESTBOOK_DB;
      const result = await db
        .prepare(
          "SELECT id, name, message, date, timestamp FROM guestbook ORDER BY timestamp DESC"
        )
        .all();
      return result.results as GuestbookEntry[];
    } catch (error) {
      console.error("Error fetching from D1 database:", error);
      return mockEntries;
    }
  }

  // Fallback to mock data if no database available
  return mockEntries;
}

export async function submitGuestbookEntry(
  name: string,
  message: string
): Promise<GuestbookEntry> {
  // For now, just add to mock data
  // In production, this would insert into the D1 database
  const newEntry: GuestbookEntry = {
    id: `guestbook_${Date.now()}`,
    name,
    message,
    date: new Date().toISOString().split("T")[0],
    timestamp: Date.now(),
  };

  mockEntries.unshift(newEntry);
  return newEntry;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}
