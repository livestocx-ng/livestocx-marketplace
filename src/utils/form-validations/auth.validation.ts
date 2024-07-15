interface SigninDto {
	email: string;
	password: string;
}

interface VendorProfileDto {
	name: string;
	email: string;
	address: string;
	state: string;
	city: string;
	phoneNumber: string;
}

interface SignupDto {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	location: string;
	businessName: string;
	businessAddress: string;
	businessState: string;
	businessCity: string;
	phoneNumber: string;
	acceptedTerms: boolean;
	confirmPassword: string;
	role: 'FARMER' | 'CUSTOMER';
}

interface PremiumSubscriptionCheckoutDto extends VendorProfileDto {
	slug: string;
	facebookUrl: string;
	instagramUrl: string;
	twitterUrl: string;
}

const phoneRegEX = new RegExp(/^\d{11}$/);

const isNumberRegEX = new RegExp(/^[0-9]+$/);

const emailRegEX = new RegExp(/^\S+@\S+\.\S+$/);

const sellerSlugRegEX = new RegExp(/^[a-z]+$/);

const passwordRegEX = new RegExp('^.{8,}$');

const socialMediaRegEX = new RegExp(
	/^(https?:\/\/)?(www\.|web\.)?(facebook\.com\/.+|instagram\.com\/.+|twitter\.com\/.+)$/
);

export function ValidateSigninFormData(formData: SigninDto): string {
	let message = '';

	if (!formData.email) {
		return (message = 'Email is required.');
	}
	if (!emailRegEX.test(formData.email)) {
		return (message = 'Invalid email input.');
	}
	if (!formData.password) {
		return (message = 'Password is required.');
	}

	return message;
}

export function ValidateSignupFormData(formData: SignupDto): string {
	let message = '';

	if (!formData.firstName) {
		return (message = 'First name is required.');
	}
	if (!formData.lastName) {
		return (message = 'Last name is required.');
	}
	if (!formData.email) {
		return (message = 'Email is required.');
	}
	if (!emailRegEX.test(formData.email)) {
		return (message = 'Invalid email input.');
	}
	if (!formData.phoneNumber) {
		return (message = 'Phone number is required.');
	}
	if (!phoneRegEX.test(formData.phoneNumber)) {
		return (message = 'Phone number must be at least 11 characters.');
	}
	if (!isNumberRegEX.test(formData.phoneNumber)) {
		return (message = 'Invalid phone number.');
	}
	if (!formData.password) {
		return (message = 'Password is required.');
	}
	if (!formData.confirmPassword) {
		return (message = 'Confirm password is required.');
	}
	if (formData.password !== formData.confirmPassword) {
		return (message = 'Passwords do match.');
	}
	if (!passwordRegEX.test(formData.password)) {
		return (message = 'Password must be at least 8 characters');
	}

	if (formData.role === 'CUSTOMER' && !formData.location) {
		return (message = 'Location is required.');
	}

	if (formData.role === 'FARMER' && !formData.businessName) {
		return (message = 'Business name is required.');
	}
	if (formData.role === 'FARMER' && !formData.businessAddress) {
		return (message = 'Business address is required.');
	}
	if (formData.role === 'FARMER' && !formData.businessState) {
		return (message = 'Business state is required.');
	}
	if (formData.role === 'FARMER' && !formData.businessCity) {
		return (message = 'Business city is required.');
	}

	if (formData.acceptedTerms === false) {
		return (message =
			'Please accept our terms of service and privacy policy.');
	}

	return message;
}

export function ValidateVendorProfileFormData(
	formData: VendorProfileDto
): string {
	let message = '';

	if (!formData.name) {
		return (message = 'Business name is required.');
	}

	if (!formData.email) {
		return (message = 'Business email is required.');
	}
	if (!emailRegEX.test(formData.email)) {
		return (message = 'Invalid email input.');
	}

	if (!formData.phoneNumber) {
		return (message = 'Phone number is required.');
	}
	if (!isNumberRegEX.test(formData.phoneNumber)) {
		return (message = 'Invalid phone number.');
	}

	if (!formData.address) {
		return (message = 'Business address is required.');
	}

	if (!formData.state) {
		return (message = 'Business state is required.');
	}

	if (!formData.city) {
		return (message = 'Business city is required.');
	}

	return message;
}

export function ValidatePremiumSubscriptionCheckoutFormData(
	formData: PremiumSubscriptionCheckoutDto
): string {
	let message = '';

	if (!formData.name) {
		return (message = 'Business name is required.');
	}

	if (!formData.email) {
		return (message = 'Business email is required.');
	}
	if (!emailRegEX.test(formData.email)) {
		return (message = 'Invalid email input.');
	}

	if (!formData.phoneNumber) {
		return (message = 'Phone number is required.');
	}
	if (!isNumberRegEX.test(formData.phoneNumber)) {
		return (message = 'Invalid phone number.');
	}

	if (!formData.address) {
		return (message = 'Business address is required.');
	}

	if (!formData.slug) {
		return (message = 'Business domain handle is required.');
	}
	if (!sellerSlugRegEX.test(formData.slug)) {
		return (message =
			'Invalid domain handle, use lowercase characters without space.');
	}

	if (!formData.state) {
		return (message = 'Business state is required.');
	}

	if (!formData.city) {
		return (message = 'Business city is required.');
	}

	if (formData.facebookUrl && !socialMediaRegEX.test(formData.facebookUrl)) {
		return (message = 'Invalid facebook url.');
	}
	if (formData.instagramUrl && !socialMediaRegEX.test(formData.instagramUrl)) {
		return (message = 'Invalid instagram url.');
	}
	if (formData.twitterUrl && !socialMediaRegEX.test(formData.twitterUrl)) {
		return (message = 'Invalid twitter url.');
	}

	return message;
}
