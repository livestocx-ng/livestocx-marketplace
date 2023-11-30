interface ContactUsDto {
	email: string;
	firstName: string;
	lastName: string;
	message: string;
}

export function ValidateContactUsFormData(formData: ContactUsDto): string {
	let message = '';

	if (!formData.firstName) {
		return (message = 'Current password is required.');
	}

	if (!formData.lastName) {
		return (message = 'Confirm password is required.');
	}

	if (!formData.email) {
		return (message = 'New password is required.');
	}

	if (!formData.message) {
		return (message = 'Confirm password is required.');
	}

	return message;
}
