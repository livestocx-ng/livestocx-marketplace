interface ComplianceDto {
	name: string;
	state?: string;
	city?: string;
	address: string;
	avatar: File | null;
	identificationDocument: File | null;
	registrationDocument: File | null;
	email: string;
	phoneNumber: string;
	isUpdated: boolean;
}

const isNumberRegEX = new RegExp(/^[0-9]+$/);
const emailRegEX = new RegExp(/^\S+@\S+\.\S+$/);

export function ValidateComplianceFormData(formData: ComplianceDto): string {
	let message = '';

	if (!formData.name) {
		return (message = 'Brand name is required.');
	}

	if (!formData.state) {
		return (message = 'State is required.');
	}

	if (!formData.city) {
		return (message = 'City is required.');
	}

	if (!formData.address) {
		return (message = 'Address is required.');
	}

	if (!formData.email) {
		return (message = 'Email is required.');
	}

	if (!emailRegEX.test(formData.email)) {
		return (message = 'Invalid email address.');
	}

	if (!formData.phoneNumber) {
		return (message = 'Phone number is required.');
	}
	if (!isNumberRegEX.test(formData.phoneNumber)) {
		return (message = 'Invalid phone number.');
	}
	if (
		formData.phoneNumber &&
		(formData.phoneNumber.length <= 10 || formData.phoneNumber.length > 11)
	) {
		return (message = 'Phone number must be at least 11 characters.');
	}

	if (!formData.avatar) {
		return (message = 'Brand logo is required.');
	}
	if (formData.avatar && typeof formData.avatar !== 'object') {
		return (message = 'Uploaded brand logo type is not a valid image.');
	}

	if (!formData.identificationDocument) {
		return (message = 'Identification document is required.');
	}
	if (
		formData.identificationDocument &&
		typeof formData.identificationDocument !== 'object'
	) {
		return (message =
			'Uploaded identification document type is not a valid image.');
	}

	if (
		formData.registrationDocument &&
		typeof formData.registrationDocument !== 'object'
	) {
		return (message =
			'Uploaded registration document type is not a valid image.');
	}

	return message;
}
