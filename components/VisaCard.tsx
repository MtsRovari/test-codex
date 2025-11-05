'use client';

import Link from 'next-intl/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { type Visa } from '@/lib/schemas';
import { useTranslations } from 'next-intl';

export function VisaCard({ countrySlug, visa }: { countrySlug: string; visa: Visa }) {
  const t = useTranslations('visa');
  const common = useTranslations('common');
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{visa.name}</span>
          <Badge variant="outline">{visa.code.toUpperCase()}</Badge>
        </CardTitle>
        {visa.summary && <CardDescription>{visa.summary}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide text-slate-500">
          {visa.purpose.map((purpose) => (
            <span key={purpose} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-slate-800">
              {purpose}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
          <p>
            <strong>{t('timelines')}:</strong> {visa.timelines.average}
          </p>
          {visa.fees[0] && (
            <p>
              <strong>{t('fees')}:</strong> {formatCurrency(visa.fees[0].amount, visa.fees[0].currency)}
            </p>
          )}
        </div>
        <Link
          href={`/countries/${countrySlug}/visa/${visa.code}`}
          className="inline-flex items-center text-sm font-medium text-brand hover:underline"
        >
          {common('learnMore')}
        </Link>
      </CardContent>
    </Card>
  );
}
