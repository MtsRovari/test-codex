'use client';

import { locales } from '@/i18n';
import { usePreferences } from '@/stores/usePreferences';
import { Select } from '@/components/ui/select';
import { useTranslations, useLocale, usePathname, useRouter } from 'next-intl/client';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const setLanguage = usePreferences((state) => state.setLanguage);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setLanguage(newLocale);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <Select aria-label={t('language')} value={locale} onChange={handleChange}>
      {locales.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </Select>
  );
}
