import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCountry, getTopicsByCountry, getVisasByCountry, countries } from '@/lib/data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastUpdated } from '@/components/LastUpdated';
import { Section } from '@/components/Section';
import { PopularTopics } from '@/components/PopularTopics';
import { VisaCard } from '@/components/VisaCard';
import { Disclaimer } from '@/components/Disclaimer';
import { Link } from '@/lib/navigation';
import { FavoriteButton } from '@/components/FavoriteButton';
import { ChecklistPDFButton } from '@/components/ChecklistPDFButton';
import { getTranslations } from 'next-intl/server';

export function generateStaticParams() {
  return countries.map((country) => ({ country: country.slug }));
}

export function generateMetadata({ params }: { params: { country: string } }): Metadata {
  const country = getCountry(params.country);
  if (!country) {
    return {
      title: 'Country not found'
    };
  }
  return {
    title: `${country.name} visas and guidance`,
    description: country.overview.summary,
    openGraph: {
      title: `${country.name} visas`,
      description: country.overview.summary
    },
    alternates: {
      canonical: `/countries/${country.slug}`
    }
  };
}

export default async function CountryPage({ params }: { params: { country: string } }) {
  const country = getCountry(params.country);
  if (!country) {
    notFound();
  }
  const visas = getVisasByCountry(country.slug);
  const topics = getTopicsByCountry(country.slug);
  const t = await getTranslations('countries');
  const common = await getTranslations('common');

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 space-y-12">
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Countries', href: '/countries' },
            { label: country.name }
          ]}
        />
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
              <span className="mr-2 text-4xl" aria-hidden>
                {country.flagEmoji}
              </span>
              {country.name}
            </h1>
            <p className="max-w-2xl text-slate-600 dark:text-slate-300">{country.overview.summary}</p>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <FavoriteButton id={country.slug} type="country" />
            <LastUpdated date={country.lastUpdated} />
          </div>
        </div>
      </div>

      <Section title={t('overview')}>
        <div className="grid gap-4 md:grid-cols-2">
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            {country.overview.notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('visas')}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('visaTypeSubtitle')}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {country.visaTypes.map((code) => (
                <Link key={code} href={`/countries/${country.slug}/visa/${code}`} className="rounded-full border border-slate-200 px-4 py-1 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
                  {code.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title={t('visaInsights')}>
        <div className="grid gap-4 md:grid-cols-2">
          {visas.map((visa) => (
            <VisaCard key={visa.code} countrySlug={country.slug} visa={visa} />
          ))}
        </div>
      </Section>

      <Section title={common('popularTopics')} subtitle={t('popularSubtitle')}>
        <PopularTopics topics={topics} countrySlug={country.slug} />
      </Section>

      <Section id="consulates" title={t('consulates')}>
        <div className="grid gap-3 md:grid-cols-2">
          {country.consulates.map((consulate) => (
            <div key={consulate.name} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{consulate.name}</p>
              <p className="text-sm text-slate-500">{consulate.city}</p>
              {consulate.notes && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{consulate.notes}</p>}
            </div>
          ))}
        </div>
      </Section>

      <div className="flex flex-col gap-4">
        <ChecklistPDFButton
          title={`${country.name} travel prep`}
          items={[
            'Valid passport with required validity',
            'DS-160 confirmation and appointment letter',
            'Financial proof for stay and return',
            'Supporting ties to home country',
            'Emergency contact information'
          ]}
        />
        <Disclaimer scope="country" />
      </div>
    </div>
  );
}
