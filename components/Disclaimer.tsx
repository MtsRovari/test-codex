'use client';

import { useTranslations } from 'next-intl';

export function Disclaimer({ scope }: { scope: 'country' | 'visa' }) {
  const t = useTranslations('common');
  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500 dark:bg-amber-500/20 dark:text-amber-100">
      <p>
        {scope === 'country'
          ? `${t('disclaimer')} Country-level information may vary by consulate.`
          : `${t('disclaimer')} Visa requirements can change based on policy updates.`}
      </p>
    </div>
  );
}
