-- Таблица пользователей (участники)
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  login TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INT NOT NULL,
  pass TEXT NOT NULL,
  created_at TEXT
);

-- Таблица администраторов (все роли)
CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  login TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  pass TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TEXT
);

-- Таблица результатов (если ещё нет)
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

-- RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "allow_all_users" ON users FOR ALL USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE POLICY "allow_all_admins" ON admins FOR ALL USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;
DO $$ BEGIN
  CREATE POLICY "allow_all_results" ON results FOR ALL USING (true);
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- 4 администратора (все одобрены)
INSERT INTO admins (login, name, role, pass, approved, created_at) VALUES
  ('admin', 'Главный Администратор', 'root', 'ege2026', true, '30.08.2026'),
  ('decan', 'Аяка Райнхард-Херувим', 'decan', 'decan2026', true, '30.08.2026'),
  ('teacher', 'Преподаватель', 'teacher', 'teach2026', true, '30.08.2026'),
  ('moderator', 'Модератор', 'admin', 'mod2026', true, '30.08.2026')
ON CONFLICT (login) DO NOTHING;
