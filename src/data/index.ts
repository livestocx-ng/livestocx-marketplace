interface NavLink {
	title: string;
	url: string;
}

export interface Testimonial {
	id: number;
	author: string;
	avatar: string;
	description: string;
}

export const NavLinks: NavLink[] = [
	{
		title: 'Home',
		url: '/',
	},
	{
		title: 'Marketplace',
		url: '#/marketplace',
	},
	{
		title: 'About',
		url: '#/about',
	},
	{
		title: 'Contact',
		url: '#/contact',
	},
	{
		title: 'Sellers',
		url: '#/sellers',
	},
];

export const Testimonials: Testimonial[] = [
	{
		id: 1,
		author: 'Blessing Ugo',
		avatar: '/testimonial_avatar_1.svg',
		description:
			'Livestocx has been the perfect marketplace for me. I had been searching for a platform to present my goat business, and this one has shown the most potential.',
	},
	{
		id: 2,
		author: 'Samuel Oguaju',
		avatar: '/testimonial_avatar_2.svg',
		description:
			'Due to the very fragmented dog market with a lot of middle men, Livestocx has helped me find more customers directly. And it is free. Amazing.',
	},
	{
		id: 3,
		author: 'Michael Jigga',
		avatar: '/testimonial_avatar_3.svg',
		description:
			'I must say that their services have left a lasting impression on me, and I am eagerly looking forward to future interactions.',
	},
];
