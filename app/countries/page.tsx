import { countries } from '@/lib/data';
import { CountryCard } from '@/components/CountryCard';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Countries | Visa Atlas',
  description: 'Browse supported countries and visa intelligence summaries.'
};

export default async function CountriesPage() {
  const t = await getTranslations('countries');
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">{t('title')}</h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">{t('listDescription')}</p>
      </header>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {countries.map((country) => (
          <CountryCard key={country.slug} country={country} />
        ))}
      </div>
    </div>
  );
}
