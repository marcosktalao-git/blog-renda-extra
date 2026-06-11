import type { ImageMetadata } from 'astro';
import { SITE_AUTHOR, SITE_TITLE } from '../consts';

export type SeoType = 'website' | 'article';

export interface BreadcrumbItem {
	name: string;
	path: string;
}

export interface ArticleSeoData {
	pubDate: Date;
	updatedDate?: Date;
}

export function absoluteUrl(path: string, site: URL | string | undefined): string {
	const base = site instanceof URL ? site : new URL(site ?? 'https://seudominio.com.br');
	return new URL(path, base).href;
}

export function resolveImageUrl(
	image: ImageMetadata | undefined,
	site: URL | string | undefined,
	fallbackSrc: string,
): string {
	const src = image?.src ?? fallbackSrc;
	return absoluteUrl(src, site);
}

export function buildArticleJsonLd(options: {
	title: string;
	description: string;
	imageUrl: string;
	canonicalUrl: string;
	pubDate: Date;
	updatedDate?: Date;
	author?: string;
}) {
	const {
		title,
		description,
		imageUrl,
		canonicalUrl,
		pubDate,
		updatedDate,
		author = SITE_AUTHOR,
	} = options;

	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: title,
		description,
		image: [imageUrl],
		datePublished: pubDate.toISOString(),
		dateModified: (updatedDate ?? pubDate).toISOString(),
		author: {
			'@type': 'Person',
			name: author,
		},
		publisher: {
			'@type': 'Organization',
			name: SITE_TITLE,
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': canonicalUrl,
		},
	};
}

export function buildBreadcrumbJsonLd(
	items: BreadcrumbItem[],
	site: URL | string | undefined,
) {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: absoluteUrl(item.path, site),
		})),
	};
}
