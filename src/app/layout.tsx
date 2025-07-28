import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { NextFont } from "next/dist/compiled/@next/font";
import AppProvider from "@/context/app-provider";
import LayoutMain from "@/layouts/layout-main";
import { Toaster } from "react-hot-toast";
import { AppProviderContext } from "@/context/app-context";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("sessionToken");

  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${fontSans.className}`} suppressHydrationWarning>
        <AppProvider>
          <AppProviderContext
            initialSessionToken={sessionToken?.value as string}
          >
            <LayoutMain>{children}</LayoutMain>
          </AppProviderContext>
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
