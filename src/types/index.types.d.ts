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
