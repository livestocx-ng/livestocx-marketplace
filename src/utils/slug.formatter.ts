import {Product, Vendor} from '@/types/types';

export function formatProductSlug(product: Product): string {
	const formattedProductName = product.name
		.replace(/\s+/g, '-')
		.toLowerCase();

	const slug = `${formattedProductName}_${product.productId.toLowerCase()}`;

	return slug;
}

export function formatVendorSlug(vendor: Vendor): string {
	const formattedVendorName = vendor.name
		.replace(/\s+/g, '-')
		.toLowerCase();

	const slug = `${formattedVendorName}_${vendor.vendorId!.toLowerCase()}`;

	return slug;
}

export function getProductIdFromSlug(slug: string): string {
	return slug.split('_')[1];
}

export function getVendorIdFromSlug(slug: string): string {
	return slug.split('_')[1];
}
