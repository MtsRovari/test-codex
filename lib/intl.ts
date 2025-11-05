import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from '@/i18n';

type Messages = typeof import('@/messages/en.json');

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as (typeof locales)[number])) {
    locale = defaultLocale;
  }

  const messages: Messages = (await import(`@/messages/${locale}.json`)).default;

  return {
    messages
  };
});
