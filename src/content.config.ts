import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const affiliateCtaSchema = z.object({
	title: z.string(),
	description: z.string().optional(),
	buttonText: z.string(),
	url: z.string().url(),
});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).min(1),
			keywords: z.array(z.string()).min(1),
			affiliate_cta: affiliateCtaSchema.optional(),
		}),
});

export const collections = { blog };

export type AffiliateCta = z.infer<typeof affiliateCtaSchema>;
