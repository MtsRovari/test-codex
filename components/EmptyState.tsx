export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-300">
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-100">{title}</h3>
      <p className="mt-2 max-w-md">{description}</p>
    </div>
  );
}
