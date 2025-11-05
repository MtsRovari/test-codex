import './globals.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Visa Atlas — Global visa intelligence',
    template: '%s | Visa Atlas'
  },
  description: 'Understand visa requirements, interview prep, and timelines for global travelers.',
  metadataBase: new URL('https://visa-atlas.example'),
  openGraph: {
    title: 'Visa Atlas',
    description: 'Visa intelligence for every traveler.',
    type: 'website'
  },
  alternates: {
    canonical: '/' // will be overridden per page where needed
  }
};

export const viewport: Viewport = {
  themeColor: '#1f6feb'
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();
  const common = await getTranslations('common');

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50`}>
        <a href="#main" className="skip-to-content">
          {common('skipToContent')}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <Suspense fallback={<div className="p-6">Loading...</div>}>
              <main id="main" className="flex-1 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
                {children}
              </main>
            </Suspense>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
