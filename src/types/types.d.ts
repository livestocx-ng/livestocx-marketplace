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
	| 'Promotions'
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
	referralCode: string;
	isProfileUpdated: boolean;
	isProductUploadSubscriptionActive: boolean;
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
	slug: string;
	address: string;
	avatar: string;
	avatarKey: string;
	email: string;
	user: string;
	isVerified: boolean;
	facebookUrl: string;
	twitterUrl: string;
	instagramUrl: string;
	isAccountDisabled: boolean;
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
	impressionCount: number;
	isPromotion: boolean;
	isNegotiable: boolean;
	totalReviews: number;
	viewCount: number;
	likeCount: number;
	purchaseCount: number;
	likedUsers: null | number[]; // Change the type of likedUsers accordingly
	media: Media[];
	createdAt: string;
	vendor?: Vendor;
	user: number;
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
	vendor: Vendor;
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
	id: string;
	author: string;
	avatarUrl: string;
	testimonial: string;
}

export interface DefaultTestimonial {
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

export interface ChatMessage {
	id: number;
	content: string;
	isRead: number[];
	timestamp: Date;
	sender: number;
	recipient: number;
	conversation: number;
	hasCTA: boolean;
	ctaType: string;
}

export interface PromotionPlan {
	id: number;
	title: string;
	description: string;
	duration: string;
	price: number;
	position: number;
	discount_price: number;
	createdAt: Date;
	updatedAt: Date;
	plan_info: {
		id: number;
		title: string;
		description: string;
	}[];
}

export interface UserPromotionPlan {
	id: number;
	user: number;
	plan: number;
	plan_info: {
		title: string;
		description: string;
		duration: string;
		price: number;
		product_count: number;
		discount_price: number;
	};
}

export interface Promotion {
	id: number;
	subscription_date: Date;
	expiration_date: Date;
	payment_method: string;
	amount_paid: number;
	position: number;
	payment_reference: string;
	payment_gateway: string;
	payment_date: Date;
	plan: {
		id: number;
		title: string;
		description: string;
		duration: string;
		price: number;
		discount_price: number;
	};
	products: number[];
}

export interface PromotionProductInfo {
	id: number;
	name: string;
	price: number;
	category: string;
	isNegotiable: boolean;
	discountPrice: number;
	media: Media[];
}

export interface PremiumSubscription {
	id: number;
	subscription_date: Date;
	expiration_date: Date;
	payment_method: string;
	amount_paid: number;
	payment_reference: string;
	payment_gateway: string;
	payment_date: Date;
	isExpired: boolean;
	user: number;
	plan: number;
}

export interface PremiumSubscriptionPlan {
	id: number;
	title: string;
	description: string;
	price: number;
	duration: string;
	duration_days: number;
	bonus_days: number;
	position: number;
	info: {
		id: number;
		title: string;
	}[];
}

export interface EnterprisePlanComparison {
	feature: string;
	platform: string;
	customBusinessWebsite: string;
}

export interface ProductUploadSubscriptionPlan {
	id: number;
	title: string;
	description: string;
	price: number;
	position: number;
	createdAt: Date;
}

export type GridItem =
	| {
			type: 'product';
			id: string;
			product: Product;
	  }
	| {
			type: 'testimonial';
			id: string;
			testimonial: Testimonial;
	  };

export interface BlogItem {
	id: number;
	title: string;
	// hasCTA: boolean;
	imageUrl: string;
	subDescription: string;
	description: string;
	createdAt: Date;
	articles: {
		id: number;
		blog: number;
		hasCTA: boolean;
        imageUrl?: string;
		title: string;
		description: string;
	}[];
}

export interface Sponsor {
	name: string;
	image: string;
}