'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SearchResult } from '@/lib/search';
import { Link } from '@/lib/navigation';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type SearchResultsProps = {
  query: string;
  allResults: SearchResult[];
  grouped: Record<'country' | 'visa' | 'topic', SearchResult[]>;
};

type TabKey = 'all' | 'country' | 'visa' | 'topic';

export function SearchResults({ query, allResults, grouped }: SearchResultsProps) {
  const t = useTranslations('search');
  const tabs = useTranslations('search.tabs');
  const common = useTranslations('common');
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const tabItems: { key: TabKey; label: string }[] = [
    { key: 'all', label: tabs('all') },
    { key: 'country', label: tabs('countries') },
    { key: 'visa', label: tabs('visas') },
    { key: 'topic', label: tabs('topics') }
  ];

  const getItemsForTab = (tab: TabKey): SearchResult[] => {
    if (tab === 'all') {
      return allResults;
    }
    return grouped[tab];
  };

  const items = getItemsForTab(activeTab);

  const showPrompt = query.length === 0;
  const showEmptyState = query.length > 0 && items.length === 0;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-slate-50">{t('results')}</h1>
        {query && (
          <p className="text-sm text-slate-600 dark:text-slate-300">{t('summary', { query, count: items.length })}</p>
        )}
      </header>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={t('results')}>
        {tabItems.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
              activeTab === tab.key
                ? 'border-brand bg-brand text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800'
            )}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {tab.key !== 'all' && (
              <Badge variant="outline" className="ml-2">
                {getItemsForTab(tab.key).length}
              </Badge>
            )}
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-live="polite">
        {showPrompt ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('placeholder')}</p>
        ) : showEmptyState ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">{common('noResults')}</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((result) => (
              <Link
                key={result.id}
                href={result.href}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{result.title}</p>
                  {result.category !== 'country' && result.countrySlug && (
                    <Badge variant="outline">{result.countrySlug.toUpperCase()}</Badge>
                  )}
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{result.description}</p>
                {result.category !== 'country' && (
                  <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                    {tabs(
                      result.category === 'visa'
                        ? 'visas'
                        : result.category === 'topic'
                          ? 'topics'
                          : 'countries'
                    )}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
