'use client';

import { useMemo, useState } from 'react';
import { FilterBar } from '@/components/FilterBar';
import { VisaCard } from '@/components/VisaCard';
import { Visa } from '@/lib/schemas';
import { EmptyState } from '@/components/EmptyState';

export function VisaListing({ visas, countrySlug }: { visas: Visa[]; countrySlug: string }) {
  const [filtered, setFiltered] = useState(visas);

  const handleFilters = (filters: { purpose: string[]; tags: string[] }) => {
    const { purpose, tags } = filters;
    const next = visas.filter((visa) => {
      const purposeMatch = purpose.length === 0 || purpose.some((item) => visa.purpose.includes(item));
      const tagsMatch = tags.length === 0 || (visa.tags ?? []).some((tag) => tags.includes(tag));
      return purposeMatch && tagsMatch;
    });
    setFiltered(next);
  };

  const results = useMemo(() => filtered, [filtered]);

  return (
    <div className="space-y-6">
      <FilterBar onChange={handleFilters} />
      {results.length === 0 ? (
        <EmptyState title="No visas found" description="Adjust your filters or explore another purpose." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((visa) => (
            <VisaCard key={visa.code} visa={visa} countrySlug={countrySlug} />
          ))}
        </div>
      )}
    </div>
  );
}
