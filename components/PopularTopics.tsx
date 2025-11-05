'use client';

import { usePreferences } from '@/stores/usePreferences';
import { Topic } from '@/lib/schemas';
import { Link } from '@/lib/navigation';
import { Badge } from '@/components/ui/badge';

export function PopularTopics({ topics, countrySlug }: { topics: Topic[]; countrySlug?: string }) {
  const { popularTopicsGlobal, popularTopicsByCountry, incrementTopic } = usePreferences((state) => ({
    popularTopicsGlobal: state.popularTopicsGlobal,
    popularTopicsByCountry: state.popularTopicsByCountry,
    incrementTopic: state.incrementTopic
  }));

  const counts = countrySlug ? popularTopicsByCountry[countrySlug] ?? {} : popularTopicsGlobal;

  const sorted = [...topics].sort((a, b) => (counts[b.id] ?? 0) - (counts[a.id] ?? 0));

  return (
    <div className="flex flex-wrap gap-3">
      {sorted.map((topic) => (
        <Link
          key={topic.id}
          href={`/topics#${topic.slug}`}
          onClick={() => incrementTopic(topic.id, countrySlug)}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <Badge variant="outline">{topic.title}</Badge>
        </Link>
      ))}
    </div>
  );
}
