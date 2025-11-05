'use client';

import { formatDate } from '@/lib/utils';
import Link from 'next-intl/link';
import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl/client';

export function LastUpdated({ date }: { date: string }) {
  const common = useTranslations('common');
  const nav = useTranslations('nav');
  const locale = useLocale();
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300">
      <Info className="h-4 w-4" aria-hidden />
      <span>
        {common('updated')} {formatDate(date, locale)} ·{' '}
        <Link href="/legal/disclaimer" className="underline">
          {nav('disclaimer')}
        </Link>
      </span>
    </div>
  );
}
