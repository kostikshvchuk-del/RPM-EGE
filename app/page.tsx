import Link from "next/link";

export default function Home() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>🏛️ ЕГЭ Штата South — CMS</h1>
      <p style={{ color: "#666", marginBottom: "30px" }}>Панель управления экзаменом и вопросами</p>
      
      <div style={{ display: "grid", gap: "16px" }}>
        <Link href="/keystatic" style={{
          display: "block", padding: "20px", background: "#1a56db", color: "#fff",
          borderRadius: "12px", textDecoration: "none", fontSize: "18px", fontWeight: "bold"
        }}>
          ⚙️ Открыть Keystatic CMS →
        </Link>
        
        <Link href="/exam" style={{
          display: "block", padding: "20px", background: "#f8fafc", border: "1px solid #d6dce7",
          borderRadius: "12px", textDecoration: "none", fontSize: "16px"
        }}>
          📝 Страница экзамена (ученик)
        </Link>
        
        <Link href="/admin-panel" style={{
          display: "block", padding: "20px", background: "#f8fafc", border: "1px solid #d6dce7",
          borderRadius: "12px", textDecoration: "none", fontSize: "16px"
        }}>
          🔍 Панель администратора
        </Link>
      </div>
    </div>
  );
}
