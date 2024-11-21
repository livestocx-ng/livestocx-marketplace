import {GridItem, Product, Testimonial} from '@/types/types';

export function premiumSubscriptionPlanDurationFormatter(
	duration: string
): string {
	let result = '';

	switch (duration) {
		case 'ONE_MONTH':
			result = '1 Month';
			break;
		case 'THREE_MONTHS':
			result = '3 Months';
			break;
		case 'SIX_MONTHS':
			result = '6 Months';
			break;
		case 'ONE_YEAR':
			result = '1 Year';
			break;
		default:
			result = '';
	}

	return result;
}

export function createGridItems(
	products: Product[],
	testimonials: Testimonial[],
	interval: number
): GridItem[] {
	const gridItems: GridItem[] = [];
	let testimonialIndex = 0;

	products.map((product, index) => {
		// Add the product as a GridItem
		gridItems.push({
			type: 'product',
			id: product.id,
			product: product,
		});

		// After every `interval` products, add a testimonial if available
		if (
			(index + 1) % interval === 0 &&
			testimonialIndex < testimonials.length
		) {
			gridItems.push({
				type: 'testimonial',
				id: testimonials[testimonialIndex].id,
				testimonial: testimonials[testimonialIndex],
			});
			testimonialIndex++;
		}
	});

	return gridItems;
}
