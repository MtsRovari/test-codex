import { groupResultsByCategory, searchAll } from '@/lib/search';

describe('searchAll', () => {
  it('returns results for visa codes and names', () => {
    const results = searchAll('b1');
    expect(results.some((item) => item.id === 'visa-usa-b1')).toBe(true);
  });

  it('filters countries case-insensitively', () => {
    const results = searchAll('united');
    expect(results.some((item) => item.id === 'country-usa')).toBe(true);
  });

  it('limits empty queries', () => {
    expect(searchAll('   ')).toEqual([]);
  });
});

describe('groupResultsByCategory', () => {
  it('groups results correctly', () => {
    const results = searchAll('visa');
    const grouped = groupResultsByCategory(results);
    expect(grouped.country).toBeDefined();
    expect(grouped.visa).toBeDefined();
    expect(grouped.topic).toBeDefined();
  });
});
