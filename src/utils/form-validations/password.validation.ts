interface UpdatePasswordDto {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

interface ResetPasswordDto {
	newPassword: string;
	confirmPassword: string;
}

const passwordRegEX = new RegExp('^.{8,}$');

export function ValidateUpdatePasswordFormData(
	formData: UpdatePasswordDto
): string {
	let message = '';

	if (!formData.currentPassword) {
		return (message = 'Current password is required.');
	}

	if (!formData.newPassword) {
		return (message = 'New password is required.');
	}
	if (!passwordRegEX.test(formData.newPassword)) {
		return (message =
			'Password must be at least 8 characters');
	}

	if (!formData.confirmPassword) {
		return (message = 'Confirm password is required.');
	}
	if (formData.newPassword !== formData.confirmPassword) {
		return (message = 'Passwords do not match!');
	}

	return message;
}

export function ValidateResetPasswordFormData(
	formData: ResetPasswordDto
): string {
	let message = '';

	if (!formData.newPassword) {
		return (message = 'New password is required.');
	}
	if (!passwordRegEX.test(formData.newPassword)) {
		return (message =
			'Password must be at least 8 characters');
	}

	if (!formData.confirmPassword) {
		return (message = 'Confirm password is required.');
	}
	if (formData.newPassword !== formData.confirmPassword) {
		return (message = 'Passwords do not match!');
	}

	return message;
}
