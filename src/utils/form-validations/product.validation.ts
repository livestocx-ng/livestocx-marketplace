import {FormData} from '@/app/(pages)/(public)/(routes)/account/components/dashboard/modals/add-product-modal';
import {FormData as UpdateProductFormData} from '@/app/(pages)/(public)/(routes)/account/components/dashboard/modals/update-product-modal';

export function ValidateCreateProductFormData(
	formData: FormData,
	productCategory: string
): string {
	let message = '';

	if (!formData.name) {
		return (message = 'Product name is required.');
	}
	if (!formData.price) {
		return (message = 'Product price is required.');
	}
	if (!parseInt(formData.price)) {
		return (message = 'Product price must be a number.');
	}
	if (!formData.discountPrice) {
		return (message = 'Product discount price is required.');
	}
	if (!parseInt(formData.discountPrice)) {
		return (message = 'Product discount must be a number..');
	}
	if (!formData.description) {
		return (message = 'Product description is required.');
	}
	if (formData.media.length == 0) {
		return (message = 'Product image|video is required');
	}
	if (!productCategory) {
		return (message = 'Product Category is required.');
	}

	return message;
}

export function ValidateUpdateProductFormData(
	formData: UpdateProductFormData,
	productCategory: string
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
	if (!productCategory) {
		return (message = 'Product Category is required.');
	}

	return message;
}
