import {fetchSiteProducts} from '@/lib/siteMapData';

export default async function sitemap() {
	const baseUrl = 'https://livestocx.com';

	const products = await fetchSiteProducts();

	const productUrls = products.map((product) => {
		return {
			url: `${baseUrl}/${product.productId.toLowerCase()}`,
			lastModified: new Date(product.createdAt),
		};
	});

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/privacy-policy`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/terms-of-service`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/contact-us`,
			lastModified: new Date(),
		},
		{
			url: `${baseUrl}/about-us`,
			lastModified: new Date(),
		},
		// ...productUrls,
	];
}
