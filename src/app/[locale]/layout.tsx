import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "../globals.css";
import { NextFont } from "next/dist/compiled/@next/font";
import AppProvider from "@/context/app-provider";
import LayoutMain from "@/layouts/layout-main";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import AppContext from "@/context/app-context";
import { CartProvider } from "@/context/cart-context";
import { QueryProvider } from "@/providers/query-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

const fontSans: NextFont = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "LALA-LYCHEEE",
  description: "CÔNG TY TNHH LALA-LYCHEEE",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Validate that the incoming `locale` parameter is valid
  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontSans.className}`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            <AppContext initialSessionToken={sessionToken?.value as string}>
              <QueryProvider>
                <CartProvider>
                  <LayoutMain>{children}</LayoutMain>
                </CartProvider>
              </QueryProvider>
            </AppContext>
            <Toaster />
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}