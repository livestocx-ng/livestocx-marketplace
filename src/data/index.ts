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

interface TeamMember {
	id: number;
	name: string;
	image: string;
	intro: string;
	facebook: string;
	linkedin: string;
	instagram: string;
}

interface FilterOption {
	id: number;
	title: string;
	value: string;
}

export const NavLinks: NavLink[] = [
	{
		title: 'Home',
		url: '/',
	},
	{
		title: 'Marketplace',
		url: '/marketplace',
	},
	{
		title: 'Sellers',
		url: '/sellers',
	},
	{
		title: 'About',
		url: '/about-us',
	},
	{
		title: 'Contact',
		url: '#/contact',
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

export const TeamMembers: TeamMember[] = [
	{
		id: 1,
		image: '/about__1.png',
		name: 'Oghenekevwe Emadago',
		intro: 'Founder of Livestocx is a skilled innovator and experienced entrepreneur who has achieved great success in his career. His previous business venture, Girlified, was able to secure a substantial amount of funding, which is a testament to his outstanding business acumen and strategic skills.',
		facebook: '#',
		linkedin:
			'https://www.linkedin.com/in/oghenekevwe-emadago?miniProfileUrn=urn%3Ali%3Afs_miniProfile%3AACoAAC6nN7sB_tHEBBPhKw7AlemgLv4gM8PXzao&lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3BNaz%2FvpQPTWu7rMCohxRbTQ%3D%3D',
		instagram: '#',
	},
	{
		id: 2,
		image: '/about__2.png',
		name: 'Idokoh Divine',
		intro: 'Founder of Livestocx is a skilled innovator and experienced entrepreneur who has achieved great success in his career. His previous business venture, Girlified, was able to secure a substantial amount of funding, which is a testament to his outstanding business acumen and strategic skills.',
		facebook: '#',
		linkedin: '#',
		instagram: '#',
	},
];

export const FilterOptions: FilterOption[] = [
	{
		id: 1,
		title: 'Cow',
		value: 'COW',
	},
	{
		id: 2,
		title: 'Goat',
		value: 'GOAT',
	},
	{
		id: 3,
		title: 'Chickens',
		value: 'CHICKEN',
	},
	{
		id: 4,
		title: 'Pig',
		value: 'PIG',
	},
	{
		id: 5,
		title: 'Sheep',
		value: 'SHEEP',
	},
	{
		id: 6,
		title: 'Dog',
		value: 'DOG',
	},
	{
		id: 7,
		title: 'Cat',
		value: 'CAT',
	},
	{
		id: 8,
		title: 'Fish',
		value: 'FISH',
	},
	{
		id: 9,
		title: 'Rabbit',
		value: 'RABBIT',
	},
];

export const NigeriaStates: string[] = [
	"Abia",
	"Adamawa",
	"Akwa Ibom",
	"Anambra",
	"Bauchi",
	"Bayelsa",
	"Benue",
	"Borno",
	"Cross River",
	"Delta",
	"Ebonyi",
	"Edo",
	"Ekiti",
	"Enugu",
	"Federal Capital Territory",
	"Gombe",
	"Imo",
	"Jigawa",
	"Kaduna",
	"Kano",
	"Katsina",
	"Kebbi",
	"Kogi",
	"Kwara",
	"Lagos",
	"Nasarawa",
	"Niger",
	"Ogun",
	"Ondo",
	"Osun",
	"Oyo",
	"Plateau",
	"Rivers",
	"Sokoto",
	"Taraba",
	"Yobe",
	"Zamfara"
  ];
  