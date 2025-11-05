import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { countries, getCountry, getVisaByCode } from '@/lib/data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LastUpdated } from '@/components/LastUpdated';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatCurrency } from '@/lib/utils';
import { ChecklistPDFButton } from '@/components/ChecklistPDFButton';
import { PremiumModal } from '@/components/PremiumModal';
import { Disclaimer } from '@/components/Disclaimer';
import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import { FavoriteButton } from '@/components/FavoriteButton';

export function generateStaticParams() {
  return countries.flatMap((country) => country.visaTypes.map((code) => ({ country: country.slug, code })));
}

export function generateMetadata({ params }: { params: { country: string; code: string } }): Metadata {
  const country = getCountry(params.country);
  const visa = getVisaByCode(params.country, params.code);
  if (!country || !visa) {
    return { title: 'Visa not found' };
  }
  return {
    title: `${country.name} — ${visa.name}`,
    description: visa.summary ?? visa.eligibility[0],
    alternates: { canonical: `/countries/${country.slug}/visa/${visa.code}` },
    openGraph: {
      title: `${country.name} — ${visa.name}`,
      description: visa.summary ?? visa.eligibility[0]
    }
  };
}

export default async function VisaDetailPage({ params }: { params: { country: string; code: string } }) {
  const country = getCountry(params.country);
  const visa = getVisaByCode(params.country, params.code);
  if (!country || !visa) {
    notFound();
  }
  const t = await getTranslations('visa');

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-16">
      <header className="space-y-4">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Countries', href: '/countries' },
            { label: country.name, href: `/countries/${country.slug}` },
            { label: 'Visa list', href: `/countries/${country.slug}/visas` },
            { label: visa.name }
          ]}
        />
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50">
              {country.name} — {visa.name}
            </h1>
            {visa.summary && <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{visa.summary}</p>}
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <FavoriteButton id={`${country.slug}-${visa.code}`} type="visa" />
            <LastUpdated date={visa.lastUpdated} />
          </div>
        </div>
      </header>

      {visa.atAGlance && (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{t('overview')}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-slate-500">{t('eligibility')}</p>
              <p className="text-base text-slate-700 dark:text-slate-200">{visa.atAGlance.eligibility}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{t('fees')}</p>
              <p className="text-base text-slate-700 dark:text-slate-200">{visa.atAGlance.fee}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{t('timelines')}</p>
              <p className="text-base text-slate-700 dark:text-slate-200">{visa.atAGlance.processing}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{t('notes')}</p>
              <p className="text-base text-slate-700 dark:text-slate-200">{visa.atAGlance.validity} · {visa.atAGlance.entries}</p>
            </div>
          </div>
        </section>
      )}

      <Accordion type="multiple" defaultValue={['eligibility', 'documents', 'fees']}>
        <AccordionItem value="eligibility">
          <AccordionTrigger>{t('eligibility')}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {visa.eligibility.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="documents">
          <AccordionTrigger>{t('documents')}</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{t('documentsInterview')}</h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  {visa.documents.interview.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{t('documentsForms')}</h3>
                <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  {visa.documents.forms.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="fees">
          <AccordionTrigger>{t('fees')}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {visa.fees.map((fee) => (
                <li key={fee.name}>
                  <strong>{fee.name}:</strong> {formatCurrency(fee.amount, fee.currency)} {fee.notes ? `— ${fee.notes}` : ''}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="timelines">
          <AccordionTrigger>{t('timelines')}</AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-slate-700 dark:text-slate-200">
              Average: {visa.timelines.average}
            </p>
            <p className="mt-2 text-sm text-slate-500">{visa.timelines.notes}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="steps">
          <AccordionTrigger>{t('steps')}</AccordionTrigger>
          <AccordionContent>
            <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {visa.steps.map((step, index) => (
                <li key={step}>
                  <strong>{index + 1}.</strong> {step}
                </li>
              ))}
            </ol>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="interview">
          <AccordionTrigger>{t('interviewTips')}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {visa.interviewTips.map((tip) => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="denial">
          <AccordionTrigger>{t('afterDenial')}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {visa.afterDenial.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faqs">
          <AccordionTrigger>{t('faqs')}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {visa.faqs.map((faq) => (
                <div key={faq.q}>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{faq.q}</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{faq.a}</p>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-wrap gap-3">
        <ChecklistPDFButton title={`${visa.name} interview checklist`} items={[...visa.documents.interview, ...visa.documents.forms]} />
        <Button variant="secondary" asChild>
          <a href="#">{t('ctaConsulting')}</a>
        </Button>
        {visa.premium.hasPremium && <PremiumModal triggerLabel={t('ctaPremium')} />}
      </div>

      <Disclaimer scope="visa" />
    </div>
  );
}
