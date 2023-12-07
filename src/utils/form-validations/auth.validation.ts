interface SigninDto {
	email: string;
	password: string;
}

interface GoogleProfileDto {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	location: string;
};

interface SignupDto {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	location: string;
	phoneNumber: string;
	acceptedTerms: boolean;
	confirmPassword: string;
	role: 'FARMER' | 'CUSTOMER';
}

const phoneRegEX = new RegExp(/^\d{11}$/);

const isNumberRegEX = new RegExp(/^[0-9]+$/);

const emailRegEX = new RegExp(/^\S+@\S+\.\S+$/);

const passwordRegEX = new RegExp(
	'(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^ws]).{8,60}$'
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
		return (message =
			'Password must be at least 8 characters, include an uppercase and lowecase character.');
	}

	if (formData.role === 'FARMER' && !formData.location) {
		return (message = 'Location is required.');
	}
	if (formData.acceptedTerms === false) {
		return (message = 'Please accept our terms of service and privacy policy.');
	}

	return message;
}

export function ValidateGoogleProfileFormData(formData: GoogleProfileDto): string {
	let message = '';

	if (!formData.firstName) {
		return (message = 'First name is required.');
	}

	if (!formData.lastName) {
		return (message = 'Last name is required.');
	}

	if (!formData.phoneNumber) {
		return (message = 'Phone number is required.');
	}
	if (!isNumberRegEX.test(formData.phoneNumber)) {
		return (message = 'Invalid phone number.');
	}

	if (!formData.location) {
		return (message = 'Location is required.');
	}

	return message;
}