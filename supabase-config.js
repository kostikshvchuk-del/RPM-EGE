// ===== SUPABASE CONFIG =====
const SUPABASE_URL = 'https://tbticsaivwpdumlvgqsa.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRidGljc2FpdndwZHVtbHZncXNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwMzgxNTIsImV4cCI6MjEwMzYxNDE1Mn0.fyv8Tu7YqjgTxQW2Icb98zuFOlpEAIk7mBgXZcv893w';

// Supabase REST helpers
async function supabaseGet(table, query = '') {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=*${query}`;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  return res.json();
}

async function supabasePost(table, data) {
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function supabasePatch(table, id, data) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`;
  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function supabaseDelete(table, id) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

// Поиск по полю
async function supabaseFind(table, field, value) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=*&${field}=eq.${encodeURIComponent(value)}`;
  const res = await fetch(url, {
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    }
  });
  return res.json();
}
