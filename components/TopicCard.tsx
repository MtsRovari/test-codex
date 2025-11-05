'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { type Topic } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { usePreferences } from '@/stores/usePreferences';
import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

export function TopicCard({ topic, countrySlug }: { topic: Topic; countrySlug: string }) {
  const incrementTopic = usePreferences((state) => state.incrementTopic);
  const t = useTranslations('common');

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{topic.title}</CardTitle>
        <CardDescription>{topic.summary}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="ghost"
          className="px-0 text-brand hover:text-brand"
          asChild
          onClick={() => incrementTopic(topic.id, countrySlug)}
        >
          <Link href={`/topics#${topic.slug}`}>{t('learnMore')}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
