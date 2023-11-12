export interface NavLink {
	title: string;
	url: string;
}

export interface TeamMember {
	id: number;
	name: string;
	image: string;
	intro: string;
	facebook: string;
	linkedin: string;
	instagram: string;
}

export interface FilterOption {
	id: number;
	title: string;
	value: string;
}
