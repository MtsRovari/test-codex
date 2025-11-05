export const locales = ['en', 'pt-BR', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localePrefix = 'never';
