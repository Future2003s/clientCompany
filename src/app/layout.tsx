import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import { NextFont } from "next/dist/compiled/@next/font";

const fontSans: NextFont = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LALALY-CHEEE",
  description: "CTY TNHH LALALY-CHEEE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${fontSans.className}`} suppressHydrationWarning>
        <div className="min-h-screen flex flex-col justify-between">
          <Header />
          <main className="mt-24">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
