'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

export function PremiumModal({ triggerLabel }: { triggerLabel: string }) {
  const t = useTranslations('premium');
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">{triggerLabel}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl focus:outline-none dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between">
            <Dialog.Title className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {t('title')}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded-full p-1 text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:hover:bg-slate-800">
                <X className="h-5 w-5" aria-hidden />
                <span className="sr-only">Close</span>
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Description className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            {t('description')}
          </Dialog.Description>
          <form className="mt-6 space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Email
              <input
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700 dark:bg-slate-900"
              />
            </label>
            <Button type="submit" className="w-full">
              {t('waitlist')}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
