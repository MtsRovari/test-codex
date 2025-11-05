import { getSearchIndex } from './data';

export type SearchCategory = 'country' | 'visa' | 'topic';
export type SearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: SearchCategory;
  countrySlug?: string;
};

const normalize = (value: string) => value.toLowerCase();

export function searchAll(query: string): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  const q = normalize(trimmed);
  const { countries, visas, topics } = getSearchIndex();

  const countryResults: SearchResult[] = countries
    .filter((country) => normalize(country.name).includes(q) || normalize(country.slug).includes(q))
    .map((country) => ({
      id: `country-${country.slug}`,
      title: country.name,
      description: country.overview.summary,
      href: `/countries/${country.slug}`,
      category: 'country' as const
    }));

  const visaResults: SearchResult[] = visas
    .filter((visa) => normalize(visa.name).includes(q) || normalize(visa.code).includes(q))
    .map((visa) => ({
      id: `visa-${visa.countrySlug}-${visa.code}`,
      title: visa.name,
      description: visa.timelines.notes,
      href: `/countries/${visa.countrySlug}/visa/${visa.code}`,
      category: 'visa' as const,
      countrySlug: visa.countrySlug
    }));

  const topicResults: SearchResult[] = topics
    .filter((topic) => normalize(topic.title).includes(q) || normalize(topic.slug).includes(q))
    .map((topic) => ({
      id: `topic-${topic.countrySlug}-${topic.id}`,
      title: topic.title,
      description: topic.summary,
      href: `/topics#${topic.slug}`,
      category: 'topic' as const,
      countrySlug: topic.countrySlug
    }));

  return [...countryResults, ...visaResults, ...topicResults].slice(0, 20);
}

export function groupResultsByCategory(results: SearchResult[]) {
  return results.reduce<Record<SearchCategory, SearchResult[]>>(
    (acc, item) => {
      acc[item.category].push(item);
      return acc;
    },
    { country: [], visa: [], topic: [] }
  );
}
