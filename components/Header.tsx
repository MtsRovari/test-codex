'use client';

import { Link } from '@/lib/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { usePathname } from '@/lib/navigation';

const navItems = [
  { href: '/', key: 'home' },
  { href: '/countries', key: 'countries' },
  { href: '/topics', key: 'topics' },
  { href: '/account', key: 'account' }
];

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          Visa Atlas
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'rounded-lg px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-50'
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
