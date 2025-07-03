import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { NextFont } from "next/dist/compiled/@next/font";
import AppProvider from "@/context/app-provider";
import LayoutMain from "@/layouts/layout-main";
import { Toaster } from "react-hot-toast";

const fontSans: NextFont = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LALA-LYCHEEE",
  description: "CÔNG TY TNHH LALA-LYCHEEE",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${fontSans.className}`} suppressHydrationWarning>
        <AppProvider>
          <LayoutMain>{children}</LayoutMain>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
