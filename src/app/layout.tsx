import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { NextFont } from "next/dist/compiled/@next/font";
import AppProvider from "@/context/app-provider";
import LayoutMain from "@/layouts/layout-main";
import { Toaster } from "react-hot-toast";
import AppContextProvider from "@/context/app-context";
<<<<<<< HEAD
=======

>>>>>>> 276a6ae18ebb88490169a9dd0533c52a67c791b3
const fontSans: NextFont = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LALA-LYCHEEE",
  description: "CÔNG TY TNHH LALA-LYCHEEE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${fontSans.className}`} suppressHydrationWarning>
        <AppProvider>
          <AppContextProvider>
            <LayoutMain>{children}</LayoutMain>
          </AppContextProvider>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
