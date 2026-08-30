import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ЕГЭ Штата South — CMS",
  description: "Панель управления экзаменом",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
