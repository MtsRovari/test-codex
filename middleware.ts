import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales, localePrefix } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix
});

export const config = {
  matcher: ['/((?!_next|api/search|.*\\.\w+$).*)']
};
