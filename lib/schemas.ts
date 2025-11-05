import { z } from 'zod';

export const visaSchema = z.object({
  code: z.string(),
  name: z.string(),
  purpose: z.array(z.string()),
  summary: z.string().optional(),
  atAGlance: z
    .object({
      eligibility: z.string(),
      fee: z.string(),
      processing: z.string(),
      validity: z.string(),
      entries: z.string()
    })
    .optional(),
  eligibility: z.array(z.string()),
  documents: z.object({
    interview: z.array(z.string()),
    forms: z.array(z.string())
  }),
  fees: z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
      currency: z.string(),
      notes: z.string().optional()
    })
  ),
  timelines: z.object({
    average: z.string(),
    notes: z.string()
  }),
  steps: z.array(z.string()),
  interviewTips: z.array(z.string()),
  afterDenial: z.array(z.string()),
  faqs: z.array(
    z.object({
      q: z.string(),
      a: z.string()
    })
  ),
  premium: z.object({
    hasPremium: z.boolean(),
    teaser: z.string()
  }),
  tags: z.array(z.string()).optional(),
  lastUpdated: z.string()
});

export const countrySchema = z.object({
  slug: z.string(),
  name: z.string(),
  iso2: z.string(),
  iso3: z.string(),
  flagEmoji: z.string(),
  lastUpdated: z.string(),
  overview: z.object({
    summary: z.string(),
    notes: z.array(z.string())
  }),
  visaTypes: z.array(z.string()),
  topics: z.array(z.string()),
  consulates: z.array(
    z.object({
      name: z.string(),
      city: z.string(),
      notes: z.string().optional()
    })
  )
});

export const topicSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  slug: z.string(),
  lastUpdated: z.string()
});

export type Visa = z.infer<typeof visaSchema>;
export type Country = z.infer<typeof countrySchema>;
export type Topic = z.infer<typeof topicSchema>;
