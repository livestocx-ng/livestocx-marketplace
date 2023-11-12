export type Tab =
	| 'Dashboard'
	| 'Product'
	| 'Products'
	| 'Order History'
	| 'Wishlist'
	| 'Shopping Cart'
	| 'Settings'
	| 'Logout';

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	avatar: string;
	phoneNumber: string;
	email: string;
	role: string;
	accessToken: string;
	refreshToken: string;
}

export interface Billing {
	id: string;
	firstName: string;
	lastName: string;
	company: string;
	address: string;
	state: string;
	city: string;
	email: string;
	phoneNumber: string;
}

export interface Vendor {
	id: string;
	vendorId?: string;
	name: string;
	location?: string;
	address: string;
	avatar: string;
	avatarKey: string;
	email: string;
	phoneNumber: string;
	isUpdated: boolean;
}

export interface Product {
	id: string;
	productId: string;
	name: string;
	price: number;
	discountPrice: number;
	category: string;
	description: string;
	isNegotiable: boolean;
	totalReviews: number;
	viewCount: number;
	likeCount: number;
	purchaseCount: number;
	likedUsers: null | string[]; // Change the type of likedUsers accordingly
	media: Media[];
	createdAt: string;
}

export interface UserProduct extends Product {
	user: ProductUser;
}

export interface Media {
	id: string;
	mediaKey: string;
	mediaType: string;
	mediaUrl: string;
	mediaBucket: string;
}

export interface ProductUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

export interface ProductInfoRating {
	rating: number;
	count: number;
}
export interface ProductInfoReview {
	id: string;
	description: string;
	rating: number;
	user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		avatar: string;
	};
}

export interface ProductInfo {
	name: string;
	address: string;
	avatar: string;
	email: string;
	phoneNumber: string;
	avgRating: number;
	moreProducts: Product[];
	reviews: ProductInfoReview[];
	ratings: ProductInfoRating[];
}

export interface ProductReviewUpdate {
	avgRating: number;
	reviews: ProductInfoReview[];
	ratings: ProductInfoRating[];
}

export interface Testimonial {
	id: number;
	author: string;
	avatar: string;
	description: string;
}
