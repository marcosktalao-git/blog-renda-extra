// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Renda Extra na Prática';
export const SITE_DESCRIPTION =
	'Dicas diretas para CLTs que querem uma segunda renda: renda extra, produto digital, afiliados e como sair da CLT — sem aparecer e sem investir muito.';
export const SITE_AUTHOR = 'Renda Extra na Prática';

export const NAV_LINKS = [
	{ href: '/', label: 'Home' },
	{ href: '/blog', label: 'Artigos' },
	{ href: '/about', label: 'Sobre' },
	{ href: '/contato', label: 'Contato' },
] as const;

export const CATEGORIES = [
	{ name: 'Renda Extra', slug: 'renda-extra' },
	{ name: 'Produto Digital', slug: 'produto-digital' },
	{ name: 'Afiliados', slug: 'afiliados' },
	{ name: 'Sair da CLT', slug: 'sair-da-clt' },
] as const;

export function tagToSlug(tag: string): string {
	return tag
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/\s+/g, '-');
}
