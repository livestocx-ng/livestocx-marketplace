export function formatPromotionPlanTitle(title: string): string {
	let result = '';

	switch (title) {
		case 'WEEKLY':
			result = 'Weekly Plan';
		case 'TWO_WEEKS':
			result = 'Two Week Plan';
		case 'MONTHLY':
			result = 'Monthly Plan';
	}

	return result;
}

export function isDateInThePast(dateToCheck: Date | string): boolean {
	const date =
		typeof dateToCheck === 'string' ? new Date(dateToCheck) : dateToCheck;

	if (isNaN(date.getTime())) {
		throw new Error('Invalid date format');
	}

	const currentDate = new Date();

	currentDate.setHours(0, 0, 0, 0);
	date.setHours(0, 0, 0, 0);

	return date < currentDate;
}

export function checkPromotionDaysRemaining(dateString: string): string {
	const targetDate = new Date(dateString);

	const today = new Date();

	today.setHours(0, 0, 0, 0);
	targetDate.setHours(0, 0, 0, 0);

	if (today > targetDate) {
		return 'Expired';
	} else {
		const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
		const daysRemaining = Math.ceil(
			(targetDate.getTime() - today.getTime()) / oneDay
		);
		return `${daysRemaining} days remaining`;
	}
}
