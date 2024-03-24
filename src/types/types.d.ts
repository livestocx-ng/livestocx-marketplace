export type Tab =
	| 'Account'
	| 'Product'
	| 'Messages'
	| 'Desired Item'
	| 'Desired Items'
	| 'Products'
	| 'Order History'
	| 'Wishlist'
	| 'Shopping Cart'
	| 'Advertise'
	| 'Messages'
	| 'Notifications'
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
	isProfileUpdated: boolean;
	isVendorProfileUpdated: boolean;
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
	state?: string;
	city?: string;
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
	inStock: boolean;
	isNegotiable: boolean;
	totalReviews: number;
	viewCount: number;
	likeCount: number;
	purchaseCount: number;
	likedUsers: null | string[]; // Change the type of likedUsers accordingly
	media: Media[];
	createdAt: string;
	vendor?: Vendor;
}

export interface DesiredItem {
	id: string;
	isTransactionCompleted: boolean;
	createdAt: string;
	product: Product;
}

export interface DesiredItemInfo {
	vendor: string;
	name: string;
	address: string;
	avatar: string;
	email: string;
	phoneNumber: string;
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

export interface Notification {
	id: number;
	title: string;
	message: string;
	isRead: boolean;
	notificationType: string;
	product: Product | null;
}

export interface ChatConversationVendor {
	id: number;
	name: string;
	email: string;
	avatar: string;
	phoneNumber: string;
	city: string;
	state: string;
	address: string;
}

export interface ChatConversationUser {
	id: number;
	name: string;
	role: string;
	email: string;
	avatar: string;
	phoneNumber: string;
}

export interface ChatConversation {
	id: number;
	unreadMessages: number;
	lastConversationMessage: string;
	lastConversationTimestamp: Date;
	vendor: ChatConversationVendor;
	user1: ChatConversationUser;
	user2: ChatConversationUser;
}
