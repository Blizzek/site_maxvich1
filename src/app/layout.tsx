import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/data/constants";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: "Rem-Maxvich-Stroi" }],
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
