import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Terms of use | Visa Atlas',
  description: 'Preview terms for Visa Atlas.'
};

export default async function TermsPage() {
  const t = await getTranslations('legal.terms');
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">{t('title')}</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300">{t('body')}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        By continuing you acknowledge this preview is for demonstration only and does not create any client relationship.
      </p>
    </div>
  );
}
