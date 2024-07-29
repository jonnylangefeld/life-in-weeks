-- users
CREATE TABLE IF NOT EXISTS
  users (
    id UUID REFERENCES auth.users PRIMARY KEY,
    date_of_birth DATE NOT NULL
  );

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow logged-in read access for users" ON users for
SELECT
  USING (auth.uid () = id);

CREATE POLICY "Allow logged-in write access for users" ON users for INSERT
WITH
  CHECK (auth.uid () = id);

-- events
CREATE TYPE color AS ENUM(
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose'
);

CREATE TABLE
  events (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users,
    title VARCHAR(255),
    emoji VARCHAR(10),
    date TIMESTAMP NOT NULL,
    to_date TIMESTAMP,
    color color
  );

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow logged-in read access for events" ON events for
ALL
  USING (auth.uid () = user_id);
