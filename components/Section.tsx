import React from 'react';
import { cn } from '@/lib/utils';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function Section({ title, subtitle, children, className, ...props }: SectionProps) {
  return (
    <section className={cn('space-y-4', className)} {...props}>
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>}
      </div>
      <div>{children}</div>
    </section>
  );
}
