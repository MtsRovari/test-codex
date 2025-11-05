'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next-intl/link';
import { useTranslations } from 'next-intl';
import { countries, getTopicsByCountry, getVisasByCountry } from '@/lib/data';
import { usePreferences } from '@/stores/usePreferences';

const purposes = ['tourism', 'business', 'study', 'work', 'transit', 'family'] as const;

const ancestryOptions = ['Italian', 'Portuguese', 'Spanish', 'German', 'Polish'];

export function EligibilityWizard() {
  const t = useTranslations('home.eligibilityWizard');
  const [nationality, setNationality] = useState('');
  const [residence, setResidence] = useState('');
  const [purpose, setPurpose] = useState('');
  const [ancestry, setAncestry] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const incrementTopic = usePreferences((state) => state.incrementTopic);

  const visas = getVisasByCountry('usa');
  const topics = getTopicsByCountry('usa');

  const recommendedVisas = purpose
    ? visas.filter((visa) => visa.purpose.includes(purpose))
    : visas.slice(0, 2);

  const recommendedTopics = topics.slice(0, 3);

  const toggleAncestry = (value: string) => {
    setAncestry((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    recommendedTopics.forEach((topic) => incrementTopic(topic.id, 'usa'));
    setShowResults(true);
  };

  return (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <header className="space-y-2">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{t('title')}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{t('subtitle')}</p>
      </header>
      <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <Select label={t('nationality')} value={nationality} onChange={(event) => setNationality(event.target.value)} required>
          <option value="" disabled>
            --
          </option>
          {countries.map((country) => (
            <option key={country.slug} value={country.slug}>
              {country.name}
            </option>
          ))}
        </Select>
        <Select label={t('residence')} value={residence} onChange={(event) => setResidence(event.target.value)} required>
          <option value="" disabled>
            --
          </option>
          {countries.map((country) => (
            <option key={country.slug} value={country.slug}>
              {country.name}
            </option>
          ))}
        </Select>
        <Select label={t('purpose')} value={purpose} onChange={(event) => setPurpose(event.target.value)} required>
          <option value="" disabled>
            --
          </option>
          {purposes.map((value) => (
            <option key={value} value={value}>
              {t(`purposeOptions.${value}`)}
            </option>
          ))}
        </Select>
        <fieldset className="flex flex-col gap-2" aria-describedby="ancestry-help">
          <legend className="text-sm font-medium text-slate-700 dark:text-slate-200">{t('ancestry')}</legend>
          <p id="ancestry-help" className="text-xs text-slate-500 dark:text-slate-400">
            {t('ancestryHelp')}
          </p>
          <div className="flex flex-wrap gap-2">
            {ancestryOptions.map((option) => {
              const selected = ancestry.includes(option);
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleAncestry(option)}
                  className={cn(
                    'rounded-full border px-3 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                    selected
                      ? 'border-brand bg-brand/10 text-brand'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                  )}
                  aria-pressed={selected}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </fieldset>
        <div className="md:col-span-2">
          <Button type="submit" className="w-full md:w-auto">
            {t('showResults')}
          </Button>
        </div>
      </form>
      {showResults && (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t('resultsTitle')}</h4>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Visas</p>
            <div className="flex flex-wrap gap-2">
              {recommendedVisas.map((visa) => (
                <Badge key={visa.code} variant="subtle">
                  <Link href={`/countries/usa/visa/${visa.code}`}>{visa.name}</Link>
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Topics</p>
            <div className="flex flex-wrap gap-2">
              {recommendedTopics.map((topic) => (
                <Badge key={topic.id} variant="outline">
                  <Link href={`/topics#${topic.slug}`}>{topic.title}</Link>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
