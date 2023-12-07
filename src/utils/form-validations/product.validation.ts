import {Media} from '@/types/types';

interface CreateProductDto {
	price: string;
	name: string;
	discountPrice: string;
	description: string;
	category: string;
	media: File[];
	isNegotiable: boolean;
}

interface UpdateProductDto {
	id: string;
	price: number;
	name: string;
	discountPrice: number;
	description: string;
	category: string;
	media: File[];
	existingMedia: Media[];
	isNegotiable: boolean;
	removedMediaIds: string[];
}

interface ProductReviewDto {
	rating: number;
	description: string;
}

const isNumberRegEX = new RegExp(/^[0-9]+$/);

export function ValidateCreateProductFormData(
	formData: CreateProductDto,
	category: string
): string {
	let message = '';

	if (!formData.name) {
		return (message = 'Product name is required.');
	}
	if (!formData.price) {
		return (message = 'Product price is required.');
	}
	if (!isNumberRegEX.test(formData.price)) {
		return (message = 'Product price must be a number.');
	}
	if (!formData.discountPrice) {
		return (message = 'Product discount price is required.');
	}
	if (!isNumberRegEX.test(formData.discountPrice)) {
		return (message = 'Product discount price must be a number..');
	}
	if (!formData.description) {
		return (message = 'Product description is required.');
	}
	if (formData.media.length == 0) {
		return (message = 'Product image|video is required');
	}
	if (!category) {
		return (message = 'Product Category is required.');
	}

	return message;
}

export function ValidateUpdateProductFormData(
	formData: UpdateProductDto,
	category: string
): string {
	let message = '';

	if (!formData.name) {
		return (message = 'Product name is required.');
	}
	if (!formData.price) {
		return (message = 'Product price is required.');
	}
	if (!formData.discountPrice) {
		return (message = 'Product discount price is required.');
	}
	if (!formData.description) {
		return (message = 'Product description is required.');
	}
	if (!category) {
		return (message = 'Product Category is required.');
	}

	return message;
}

export function ValidateProductReviewFormData(
	formData: ProductReviewDto
): string {
	let message = '';

	if (!formData.rating) {
		return (message = 'Review rating is required.');
	}

	if (!formData.description) {
		return (message = 'Review description is required.');
	}

	return message;
}
