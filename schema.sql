-- Guestbook table schema for D1 database
CREATE TABLE IF NOT EXISTS guestbook (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  date TEXT NOT NULL,
  timestamp INTEGER NOT NULL
);

-- Create an index on timestamp for faster sorting
CREATE INDEX IF NOT EXISTS idx_guestbook_timestamp ON guestbook(timestamp DESC);