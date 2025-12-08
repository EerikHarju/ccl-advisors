import { defineCollection, z } from 'astro:content';

const references = defineCollection({
  schema: z.object({
    id: z.string(),
    text: z.string(),
    date: z.string(),
  }),
});

export const collections = {
  references,
};
