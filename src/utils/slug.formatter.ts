import {BlogItem, Product, Vendor} from '@/types/types';


export function formatBlogSlug(blog: BlogItem): string {
	const formattedName = blog?.title.replace(/,/g, '');

	const formattedNameWithoutCommas = formattedName
		.replace(/[^\w\s]/g, '')
		.replace(/\s+/g, '-')
		.toLowerCase();

	const slug = `${formattedNameWithoutCommas}_${blog.id}`;

	return slug.toLowerCase();
}

export function formatProductSlug(product: Product): string {
	// Remove commas from the product name
	const formattedProductName = product.name.replace(/,/g, '');

	// Replace spaces with dashes and convert to lowercase
	const formattedProductNameWithoutCommas = formattedProductName
		.replace(/\s+/g, '-')
		.toLowerCase();

	// Concatenate product name and product ID with an underscore
	const slug = `${formattedProductNameWithoutCommas}_${product.productId}`;

	return slug.toLowerCase();
}

export function formatVendorSlug(vendor: Vendor): string {
	// const slug = vendor?.slug.replace(/,/g, '');

	// const formattedVendorNameWithOutCommas = formattedVendorName.replace(/\s+/g, '-').toLowerCase();

	// const slug = `${formattedVendorNameWithOutCommas}_${vendor?.vendorId!.toLowerCase()}`;

	return vendor?.slug.toLowerCase();
}

export function getProductIdFromSlug(slug: string): string {
	return slug.split('_')[1];
}

export function getVendorIdFromSlug(slug: string): string {
	return slug.split('_')[1];
}
