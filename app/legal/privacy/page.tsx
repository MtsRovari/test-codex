import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Privacy notice | Visa Atlas',
  description: 'Understand how Visa Atlas handles your information.'
};

export default async function PrivacyPage() {
  const t = await getTranslations('legal.privacy');
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">{t('title')}</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300">{t('body')}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        We store preferences like language, favorites, and popular topics in your browser using local storage and cookies. No data leaves your device in this prototype.
      </p>
    </div>
  );
}
