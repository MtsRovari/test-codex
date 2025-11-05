import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Account | Visa Atlas',
  description: 'Future space for favorites and premium content.',
  robots: {
    index: false
  }
};

export default async function AccountPage() {
  const t = await getTranslations('account');
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">{t('title')}</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300">{t('subtitle')}</p>
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300">
        {t('favorites')}: feature planned.
      </div>
    </div>
  );
}
