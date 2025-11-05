import countriesRaw from '@/data/countries.json';
import usaVisasRaw from '@/data/visas/usa.json';
import usaTopicsRaw from '@/data/topics/usa.json';
import { countrySchema, type Country, topicSchema, type Topic, visaSchema, type Visa } from './schemas';

const countriesResult = countrySchema.array().safeParse(countriesRaw);
if (!countriesResult.success) {
  console.error(countriesResult.error.issues);
  throw new Error('Invalid countries data');
}

const usaVisasResult = visaSchema.array().safeParse(usaVisasRaw);
if (!usaVisasResult.success) {
  console.error(usaVisasResult.error.issues);
  throw new Error('Invalid USA visa data');
}

const usaTopicsResult = topicSchema.array().safeParse(usaTopicsRaw);
if (!usaTopicsResult.success) {
  console.error(usaTopicsResult.error.issues);
  throw new Error('Invalid USA topics data');
}

export const countries: Country[] = countriesResult.data;

const visaMap: Record<string, Visa[]> = {
  usa: usaVisasResult.data
};

export const topicsByCountry: Record<string, Topic[]> = {
  usa: usaTopicsResult.data
};

export function getCountry(slug: string): Country | undefined {
  return countries.find((country) => country.slug === slug);
}

export function getVisasByCountry(slug: string): Visa[] {
  return visaMap[slug] ?? [];
}

export function getVisaByCode(slug: string, code: string): Visa | undefined {
  return getVisasByCountry(slug).find((visa) => visa.code === code);
}

export function getTopicsByCountry(slug: string): Topic[] {
  return topicsByCountry[slug] ?? [];
}

export function getSearchIndex() {
  return {
    countries,
    visas: Object.entries(visaMap).flatMap(([countrySlug, items]) =>
      items.map((visa) => ({ ...visa, countrySlug }))
    ),
    topics: Object.entries(topicsByCountry).flatMap(([countrySlug, items]) =>
      items.map((topic) => ({ ...topic, countrySlug }))
    )
  };
}
