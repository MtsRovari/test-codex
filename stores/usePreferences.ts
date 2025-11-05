import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Favorites = {
  countries: string[];
  visas: string[];
};

type FilterState = {
  purpose: string[];
  tags: string[];
};

type PopularityCounts = Record<string, number>;

export type PreferencesState = {
  favorites: Favorites;
  filters: FilterState;
  language: string;
  popularTopicsGlobal: PopularityCounts;
  popularTopicsByCountry: Record<string, PopularityCounts>;
  addFavoriteCountry: (slug: string) => void;
  addFavoriteVisa: (key: string) => void;
  removeFavoriteCountry: (slug: string) => void;
  removeFavoriteVisa: (key: string) => void;
  toggleFavoriteCountry: (slug: string) => void;
  toggleFavoriteVisa: (key: string) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setLanguage: (language: string) => void;
  incrementTopic: (topicId: string, countrySlug?: string) => void;
  resetFilters: () => void;
};

const defaultState: Omit<PreferencesState, keyof Favorites | keyof FilterState | 'addFavoriteCountry' | 'addFavoriteVisa' | 'removeFavoriteCountry' | 'removeFavoriteVisa' | 'toggleFavoriteCountry' | 'toggleFavoriteVisa' | 'setFilters' | 'setLanguage' | 'incrementTopic' | 'resetFilters'> &
  Favorites &
  FilterState = {
  favorites: { countries: [], visas: [] },
  filters: { purpose: [], tags: [] },
  language: 'en',
  popularTopicsGlobal: {},
  popularTopicsByCountry: {}
} as PreferencesState;

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      ...defaultState,
      addFavoriteCountry: (slug) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            countries: state.favorites.countries.includes(slug)
              ? state.favorites.countries
              : [...state.favorites.countries, slug]
          }
        })),
      addFavoriteVisa: (key) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            visas: state.favorites.visas.includes(key)
              ? state.favorites.visas
              : [...state.favorites.visas, key]
          }
        })),
      removeFavoriteCountry: (slug) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            countries: state.favorites.countries.filter((item) => item !== slug)
          }
        })),
      removeFavoriteVisa: (key) =>
        set((state) => ({
          favorites: {
            ...state.favorites,
            visas: state.favorites.visas.filter((item) => item !== key)
          }
        })),
      toggleFavoriteCountry: (slug) =>
        set((state) => ({
          favorites: state.favorites.countries.includes(slug)
            ? {
                ...state.favorites,
                countries: state.favorites.countries.filter((item) => item !== slug)
              }
            : { ...state.favorites, countries: [...state.favorites.countries, slug] }
        })),
      toggleFavoriteVisa: (key) =>
        set((state) => ({
          favorites: state.favorites.visas.includes(key)
            ? { ...state.favorites, visas: state.favorites.visas.filter((item) => item !== key) }
            : { ...state.favorites, visas: [...state.favorites.visas, key] }
        })),
      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters }
        })),
      setLanguage: (language) => set(() => ({ language })),
      incrementTopic: (topicId, countrySlug) =>
        set((state) => {
          const globalCount = state.popularTopicsGlobal[topicId] ?? 0;
          const updated: Partial<PreferencesState> = {
            popularTopicsGlobal: {
              ...state.popularTopicsGlobal,
              [topicId]: globalCount + 1
            }
          };

          if (countrySlug) {
            const countryCounts = state.popularTopicsByCountry[countrySlug] ?? {};
            updated.popularTopicsByCountry = {
              ...state.popularTopicsByCountry,
              [countrySlug]: {
                ...countryCounts,
                [topicId]: (countryCounts[topicId] ?? 0) + 1
              }
            };
          }

          return updated as PreferencesState;
        }),
      resetFilters: () => set(() => ({ filters: { purpose: [], tags: [] } }))
    }),
    {
      name: 'visa-navigator-preferences',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined'
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => undefined,
              removeItem: () => undefined
            }
      )
    }
  )
);
