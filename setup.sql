CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  login TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INT NOT NULL,
  pass TEXT NOT NULL,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  login TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  pass TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS results (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  game_nick TEXT,
  age INT,
  answers JSONB,
  date TEXT,
  timestamp BIGINT,
  admin_score INT,
  status TEXT DEFAULT 'pending'
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN CREATE POLICY "p1" ON users FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE POLICY "p2" ON admins FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN null; END $$;
DO $$ BEGIN CREATE POLICY "p3" ON results FOR ALL USING (true); EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Главный Администратор (только он!)
INSERT INTO admins (login, name, role, pass, approved, created_at) VALUES
  ('kiralis29', 'Главный Администратор', 'root', 'operGL5454', true, '30.08.2026')
ON CONFLICT (login) DO NOTHING;
