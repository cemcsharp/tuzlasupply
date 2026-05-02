import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tuzla Supply | Kapsamlı Tedarik Çözümleri",
  description: "Denizcilik, endüstriyel, teknik, elektronik ve IT malzemeleri tedarik ağınız. Kurumsal ihtiyaçlarınız için tek adres.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
