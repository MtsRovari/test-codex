# Visa Atlas

Visa Atlas is a Next.js 14 App Router prototype that showcases how to publish global visa guidance with multi-language support, structured data, and engaging UI patterns.

## Getting started

```bash
pnpm install # or npm install / yarn install
pnpm dev      # run the development server
pnpm build    # create production build
pnpm start    # run production build
pnpm lint     # lint with ESLint
pnpm test     # run Jest unit tests
```

> The project uses Next.js 14, TypeScript, Tailwind CSS, shadcn/ui components, next-intl, Zod, Zustand, and local JSON content.

## Project structure

- `app/` — App Router pages, API routes, sitemap, and robots configuration.
- `components/` — Reusable UI components (header, search, cards, wizard, etc.).
- `data/` — Local JSON content validated by Zod schemas.
- `lib/` — Utilities, schemas, search helpers, and internationalization config.
- `stores/` — Zustand stores for preferences and topic popularity.
- `messages/` — Translations for English (`en`), Brazilian Portuguese (`pt-BR`), and Spanish (`es`).

## Adding a country

1. Append a new object to `data/countries.json` following the schema (slug, ISO codes, overview, visaTypes, topics, consulates).
2. Create a JSON file in `data/visas/<country-slug>.json` with an array of visa objects (see `data/visas/usa.json` for a detailed example).
3. Create `data/topics/<country-slug>.json` listing curated topics.
4. Add imports and validation in `lib/data.ts` (mirroring how the USA data is loaded) so the new files participate in the site build.

## Adding a visa to an existing country

1. Open `data/visas/<country>.json`.
2. Add a new visa object respecting the schema defined in `lib/schemas.ts`.
3. Update the associated country's `visaTypes` array in `data/countries.json` so the code appears in cards and navigation.

## Adding translations

1. Update the relevant locale file in `messages/` (`en.json`, `pt-BR.json`, or `es.json`).
2. Add matching keys across all locale files to keep parity.
3. UI copies automatically pull from the translation dictionaries via `next-intl`.

## Checklist features

- Multi-lingual UI (English, Portuguese, Spanish) with cookie persistence.
- Home with hero search, flag grid, eligibility wizard, and trending topics.
- Country page with visa cards, topics, consulates, CTAs, and disclaimers.
- Visa detail page featuring collapsible sections, checklist PDF export, FAQs, and premium hooks.
- Search API with autocomplete, categorized responses, keyboard navigation, and a tabbed results page.
- Local JSON data validated via Zod at load time.
- Zustand-powered local storage for filters, favorites (stubs), language preference, and topic popularity counters.
- Tailwind + shadcn/ui styling, dark mode toggle, accessible focus states, and responsive layout.
- SEO basics: metadata, OpenGraph, sitemap, robots directives.

## Testing

- Run `pnpm test` to execute Jest tests (search utility coverage).
- Run `pnpm lint` to enforce ESLint + Prettier rules.

## Notes

- Premium content, payments, and PDF checklist downloads are placeholders for future integrations.
- Lighthouse accessibility target ≥ 90; focus indicators and aria attributes are in place.
