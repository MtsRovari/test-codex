import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, label, ...props }, ref) => (
  <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
    {label && <span>{label}</span>}
    <select
      ref={ref}
      className={cn(
        'h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
        className
      )}
      {...props}
    >
      {children}
    </select>
  </label>
));
Select.displayName = 'Select';
