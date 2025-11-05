'use client';

import { useEffect } from 'react';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { usePreferences } from '@/stores/usePreferences';
import { useTranslations } from 'next-intl';

const purposes = ['business', 'tourism', 'study', 'work', 'exchange'] as const;

const tags = ['interview-required', 'biometric', 'premium-processing'] as const;

export function FilterBar({ onChange }: { onChange: (filters: { purpose: string[]; tags: string[] }) => void }) {
  const t = useTranslations('countries.filters');
  const { filters, setFilters, resetFilters } = usePreferences((state) => ({
    filters: state.filters,
    setFilters: state.setFilters,
    resetFilters: state.resetFilters
  }));

  useEffect(() => {
    onChange(filters);
  }, [filters, onChange]);

  const toggleTag = (value: string) => {
    const hasTag = filters.tags.includes(value);
    setFilters({ tags: hasTag ? filters.tags.filter((tag) => tag !== value) : [...filters.tags, value] });
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
        <Select
          label={t('purpose')}
          value={filters.purpose[0] ?? ''}
          onChange={(event) => setFilters({ purpose: event.target.value ? [event.target.value] : [] })}
        >
          <option value="">{t('all')}</option>
          {purposes.map((purpose) => (
            <option key={purpose} value={purpose}>
              {t(`purposeOptions.${purpose}`)}
            </option>
          ))}
        </Select>
        <div className="flex flex-wrap gap-2" aria-label={t('tags')}>
          {tags.map((tag) => {
            const selected = filters.tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                  selected
                    ? 'border-brand bg-brand/10 text-brand'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                }`}
                aria-pressed={selected}
              >
                {t(`tagOptions.${tag}`)}
              </button>
            );
          })}
        </div>
      </div>
      <Button type="button" variant="ghost" onClick={resetFilters}>
        {t('clear')}
      </Button>
    </div>
  );
}
