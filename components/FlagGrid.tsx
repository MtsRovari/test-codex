'use client';

import { useState } from 'react';
import { Link } from '@/lib/navigation';
import { countries } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

export function FlagGrid() {
  const t = useTranslations('countries');
  const [filter, setFilter] = useState('');

  const filtered = countries.filter((country) => {
    if (!filter) return true;
    const query = filter.toLowerCase();
    return country.name.toLowerCase().includes(query) || country.slug.includes(query);
  });

  return (
    <div className="space-y-4">
      <Input
        type="search"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
        placeholder={t('searchPlaceholder')}
        aria-label={t('searchPlaceholder')}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((country) => (
          <Link
            key={country.slug}
            href={`/countries/${country.slug}`}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="text-3xl" aria-hidden>
              {country.flagEmoji}
            </span>
            <div>
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{country.name}</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">{country.iso3}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
