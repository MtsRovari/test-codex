import Link from 'next-intl/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm text-slate-500', className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-slate-900 dark:hover:text-slate-100">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-slate-700 dark:text-slate-200">
                {item.label}
              </span>
            )}
            {index < items.length - 1 && <ChevronRight className="h-4 w-4" aria-hidden />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
