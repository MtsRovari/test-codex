import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCountry, getVisasByCountry, countries } from '@/lib/data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { VisaListing } from '@/components/VisaListing';
import { getTranslations } from 'next-intl/server';

export function generateStaticParams() {
  return countries.map((country) => ({ country: country.slug }));
}

export function generateMetadata({ params }: { params: { country: string } }): Metadata {
  const country = getCountry(params.country);
  if (!country) {
    return { title: 'Visa list' };
  }
  return {
    title: `${country.name} visa list`,
    description: `Explore available visas for ${country.name}.`,
    alternates: { canonical: `/countries/${country.slug}/visas` }
  };
}

export default async function CountryVisasPage({ params }: { params: { country: string } }) {
  const country = getCountry(params.country);
  if (!country) {
    notFound();
  }
  const visas = getVisasByCountry(country.slug);
  const t = await getTranslations('countries');

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-16">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Countries', href: '/countries' },
          { label: country.name, href: `/countries/${country.slug}` },
          { label: 'Visa list' }
        ]}
      />
      <header className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
          {country.name} — {t('visaList')}
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-300">{t('visaListDescription')}</p>
      </header>
      <VisaListing visas={visas} countrySlug={country.slug} />
    </div>
  );
}
