'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next-intl/client';
import { useTranslations } from 'next-intl';
import { SearchResult } from '@/lib/search';
import { cn } from '@/lib/utils';

export function SearchBar({ autoFocus }: { autoFocus?: boolean }) {
  const t = useTranslations('home');
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = (await response.json()) as { results: SearchResult[] };
        setResults(data.results);
        setActiveIndex(0);
      }
    }, 200);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);

  const goToSearchPage = () => {
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (results[activeIndex]) {
      router.push(results[activeIndex].href);
    } else if (query) {
      goToSearchPage();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (results.length === 0) return;
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (results.length === 0) return;
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (results[activeIndex]) {
        router.push(results[activeIndex].href);
      } else {
        goToSearchPage();
      }
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden />
        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          placeholder={t('searchPlaceholder')}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
        />
        <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-2 py-1 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900 md:block">
          /
        </kbd>
      </form>
      {results.length > 0 && (
        <ul
          id="search-suggestions"
          role="listbox"
          className="absolute z-20 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900"
        >
          {results.map((result, index) => (
            <li key={result.id}>
              <button
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => router.push(result.href)}
                className={cn(
                  'flex w-full flex-col rounded-xl px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                  index === activeIndex
                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                )}
              >
                <span className="font-medium text-slate-900 dark:text-slate-100">{result.title}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{result.description}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
