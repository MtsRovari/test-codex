import { SearchBar } from '@/components/SearchBar';
import { FlagGrid } from '@/components/FlagGrid';
import { EligibilityWizard } from '@/components/EligibilityWizard';
import { Section } from '@/components/Section';
import { PopularTopics } from '@/components/PopularTopics';
import { TopicCard } from '@/components/TopicCard';
import { getTopicsByCountry } from '@/lib/data';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Visa Atlas — Global visa intelligence',
  description: 'Explore visa requirements, timelines, and interview preparation for every traveler.'
};

export default async function HomePage() {
  const usaTopics = getTopicsByCountry('usa');
  const t = await getTranslations('home');
  const sections = await getTranslations('homeSections');
  const common = await getTranslations('common');

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16">
      <section className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t('title')}</h1>
          <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">{t('subtitle')}</p>
          <SearchBar autoFocus />
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{common('popularTopics')}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{sections('popularSubtitle')}</p>
          <div className="mt-4">
            <PopularTopics topics={usaTopics} />
          </div>
        </div>
      </section>
      <Section title={sections('wizardTitle')} subtitle={sections('wizardSubtitle')}>
        <EligibilityWizard />
      </Section>
      <Section title={sections('countriesTitle')} subtitle={sections('countriesSubtitle')}>
        <FlagGrid />
      </Section>
      <Section title={sections('topicsTitle')} subtitle={sections('topicsSubtitle')}>
        <div className="grid gap-4 md:grid-cols-2">
          {usaTopics.slice(0, 4).map((topic) => (
            <TopicCard key={topic.id} topic={topic} countrySlug="usa" />
          ))}
        </div>
      </Section>
    </div>
  );
}
