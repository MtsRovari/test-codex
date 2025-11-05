import { Metadata } from 'next';
import { searchAll, groupResultsByCategory } from '@/lib/search';
import { SearchResults } from '@/components/SearchResults';
import { SearchBar } from '@/components/SearchBar';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Search | Visa Atlas',
  description: 'Find visa, country, and topic guidance quickly with our global search.'
};

type SearchPageProps = {
  searchParams: {
    q?: string;
  };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const rawQuery = searchParams.q;
  const queryValue = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;
  const query = queryValue?.trim() ?? '';
  const results = query ? searchAll(query) : [];
  const grouped = groupResultsByCategory(results);
  const t = await getTranslations('search');

  return (
    <div className="mx-auto max-w-6xl space-y-12 px-6 py-16">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">{t('results')}</h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-300">{t('placeholder')}</p>
      </header>
      <SearchBar autoFocus />
      <SearchResults query={query} allResults={results} grouped={grouped} />
    </div>
  );
}
