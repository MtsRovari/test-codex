import { Metadata } from 'next';
import { getTopicsByCountry } from '@/lib/data';
import { TopicCard } from '@/components/TopicCard';
import { SearchBar } from '@/components/SearchBar';
import { PopularTopics } from '@/components/PopularTopics';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Topics | Visa Atlas',
  description: 'Guides on interviews, DS-160, timelines, and more.'
};

export default async function TopicsPage({ searchParams }: { searchParams: { search?: string } }) {
  const usaTopics = getTopicsByCountry('usa');
  const search = searchParams.search?.toLowerCase() ?? '';
  const filtered = search
    ? usaTopics.filter((topic) => topic.title.toLowerCase().includes(search) || topic.summary.toLowerCase().includes(search))
    : usaTopics;
  const t = await getTranslations('topics');
  const common = await getTranslations('common');

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">{t('title')}</h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-300">{t('description')}</p>
      </header>
      <SearchBar />
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{t('mostRead')}</h2>
        <PopularTopics topics={usaTopics} countrySlug="usa" />
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {filtered.map((topic) => (
          <TopicCard key={topic.id} topic={topic} countrySlug="usa" />
        ))}
        {filtered.length === 0 && <p className="text-sm text-slate-500">{common('noResults')}</p>}
      </section>
    </div>
  );
}
