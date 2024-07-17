import {Product, Vendor} from '@/types/types';

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

<<<<<<< HEAD
	const slug = `${formattedVendorNameWithOutCommas}_${vendor?.vendorId!}`;
=======
	// const slug = `${formattedVendorNameWithOutCommas}_${vendor?.vendorId!.toLowerCase()}`;
>>>>>>> 96786d9fdd93321b006fe77a73c763b703a3a574

	return vendor?.slug.toLowerCase();
}

export function getProductIdFromSlug(slug: string): string {
	return slug.split('_')[1];
}

export function getVendorIdFromSlug(slug: string): string {
	return slug.split('_')[1];
}
