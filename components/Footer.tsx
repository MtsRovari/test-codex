'use client';

import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('nav');
  const common = useTranslations('common');

  return (
    <footer className="border-t border-slate-200 bg-white py-8 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl">
          © {new Date().getFullYear()} Visa Atlas. {common('disclaimer')}
        </p>
        <nav className="flex flex-wrap gap-4" aria-label="Legal">
          <Link href="/legal/disclaimer" className="hover:text-slate-900 dark:hover:text-white">
            {t('disclaimer')}
          </Link>
          <Link href="/legal/privacy" className="hover:text-slate-900 dark:hover:text-white">
            {t('privacy')}
          </Link>
          <Link href="/legal/terms" className="hover:text-slate-900 dark:hover:text-white">
            {t('terms')}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
