import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Legal disclaimer | Visa Atlas',
  description: 'Important legal disclaimers about the visa content presented.'
};

export default async function DisclaimerPage() {
  const t = await getTranslations('legal.disclaimer');
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-6 py-16">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">{t('title')}</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300">{t('body')}</p>
      <ul className="list-disc space-y-3 pl-6 text-sm text-slate-600 dark:text-slate-300">
        <li>Always verify requirements with official embassy and consulate channels.</li>
        <li>Processing times are estimates; no outcomes are guaranteed.</li>
        <li>This platform does not replace tailored legal advice from licensed professionals.</li>
      </ul>
    </div>
  );
}
