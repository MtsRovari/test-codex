'use client';

import Link from 'next-intl/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Country } from '@/lib/schemas';

export function CountryCard({ country }: { country: Country }) {
  const t = useTranslations('countries');
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold">
            <span className="mr-2 text-3xl" aria-hidden>
              {country.flagEmoji}
            </span>
            {country.name}
          </CardTitle>
          <CardDescription>{country.overview.summary}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Button asChild>
          <Link href={`/countries/${country.slug}`}>{t('overview')}</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/countries/${country.slug}/visas`}>{t('visaList')}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
