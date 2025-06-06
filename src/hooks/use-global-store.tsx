import {
	Tab,
	User,
	Media,
	Vendor,
	Billing,
	Product,
	ProductInfo,
	DesiredItem,
	Notification,
	DesiredItemInfo,
	ChatConversation,
	ChatMessage,
	PromotionPlan,
	UserPromotionPlan,
	Promotion,
	PremiumSubscription,
	PromotionProductInfo,
	PremiumSubscriptionPlan,
	ProductUploadSubscriptionPlan,
	Testimonial,
	BlogItem,
} from '@/types/types';
import { Socket } from 'socket.io-client';
import {create} from 'zustand';

interface GlobalStore {
	socket: Socket | null;
	cookieConsentStatus: boolean,
	chatConversation: ChatConversation | null;
	chatConversations: ChatConversation[];
	chatConversationMessages: ChatMessage[];
	showChatConversation: boolean;
	searchQuery: string;
	searchQueryState: string;
	searchQueryCity: string | 'Nigeria';
	user: User | null;
	blog: BlogItem | null;
	blogs: BlogItem[];
	userPremiumSubscription: PremiumSubscription | null;
	premiumSubscriptionPlans: PremiumSubscriptionPlan[];
	productUploadSubscriptionPlans: ProductUploadSubscriptionPlan[];
	vendor: Vendor | null;
	vendorProfile: Vendor | null;
	vendors: Vendor[];
	billing: Billing | null;
	product: Product | null;
	notifications: Notification[];
	desiredProductInfo: DesiredItemInfo | null;
	desiredProduct: DesiredItem | null;
	desiredProducts: DesiredItem[];
	productInfo: ProductInfo | null;
	products: Product[];
	searchProducts: Product[];
	sellerProducts: Product[];
	totalPages: number;
	hasNextPage: boolean;
	searchTotalPages: number;
	searchHasNextPage: boolean;
	sellerTotalPages: number;
	sellerHasNextPage: boolean;
	currentAccountTab: Tab | 'Account' | null;
	promotionPlans: PromotionPlan[];
	userPromotionPlan: UserPromotionPlan | null;
	promotions: Promotion[];
	promotionProductsInfo: PromotionProductInfo[];
	currentPromotionPlan: number;
	promotionsTotalPages: number;
	promotionsHasNextPage: boolean;
	showPromotionInfo: boolean;
	testimonials: Testimonial[];
	currentPromotion: Promotion | null;
	promotionProducts: Product[];
	promotionInfoProducts: Product[];
	promotionProductsTotalPages: number;
	promotionProductsHasNextPage: boolean;
	premiumSubscriptionPlanId: number;
	premiumSubscriptionPlanAmount: number;
	updateBlog: (value: BlogItem) => void;
	updateBlogs: (value: BlogItem[]) => void;
	updateTestimonials: (value: Testimonial[]) => void;
	updatePremiumSubscriptionPlanInfo: (id: number, amount: number)=> void;
	updateUserPremiumSubscription: (value: PremiumSubscription | null)=> void;
	updatePremiumSubscriptionPlans: (value: PremiumSubscriptionPlan[])=> void;
	updateProductUploadSubscriptionPlans: (value: ProductUploadSubscriptionPlan[])=> void;
	updatePromotionInfoProducts: (value: Product[])=> void;
	updatePromotionProducts: (value: Product[])=> void;
	updateCurrentPromotion: (value: Promotion | null)=> void;
	updateShowPromotionInfo: (value: boolean)=> void;
	updateCurrentPromotionPlan: (value: number)=> void;
	updatePromotionPlans: (value: PromotionPlan[])=> void;
	updateUserPromotionPlan: (value: UserPromotionPlan)=> void;
	updatePromotions: (value: Promotion[])=> void;
	updatePromotionProductsInfo: (value: PromotionProductInfo[])=> void;
	updatePromotionsPagination: (totalPages: number, hasNextPage: boolean) => void;
	updatePromotionProductsPagination: (totalPages: number, hasNextPage: boolean) => void;
	updateCookieConsentStatus: (value: boolean)=> void;
	updateChatConversation: (value: ChatConversation | null)=> void;
	updateChatConversations: (value: ChatConversation[])=> void;
	addChatConversationMessage: (value: ChatMessage)=> void;
	updateChatConversationMessages: (value: ChatMessage[])=> void;
	updateSocketInstance: (value: Socket)=> void;
	updateShowChatConversation: (value: boolean)=> void;
	updateSearchQuery: (searchQuery: string)=> void;
	updateSearchLocation: (searchQueryCity: string, searchQueryState: string)=> void;
	updateNotification: (notificationId: number, value: Notification) => void;
	updateNotifications: (value: Notification[]) => void;
	updateDesiredProductInfo: (value: DesiredItemInfo) => void;
	updateDesiredProduct: (value: DesiredItem) => void;
	updateDesiredProducts: (value: DesiredItem[]) => void;
	updateVendors: (value: Vendor[]) => void;
	updateVendorProfile: (value: Vendor | null) => void;
	updateCurrentAccountTab: (value: Tab) => void;
	updatePayload: (value: Product) => void;
	updateVendor: (value: Vendor | null) => void;
	updateBilling: (value: Billing | null) => void;
	updateUser: (value: User | null) => void;
	updateProducts: (products: Product[]) => void;
	updateSearchProducts: (products: Product[]) => void;
	updateSellerProducts: (products: Product[]) => void;
	updateProductInfo: (value: ProductInfo) => void;
	updateProduct: (productId: string, product: Product) => void;
	updatePagination: (totalPages: number, hasNextPage: boolean) => void;
	updateSearchPagination: (totalPages: number, hasNextPage: boolean) => void;
	updateSellerPagination: (totalPages: number, hasNextPage: boolean) => void;
}

interface ActivateModal {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

interface ReadNotificationModal extends ActivateModal {
	payload: Notification | null;
	updatePayload: (value: Notification) => void;
}

interface ProductModal extends ActivateModal {
	payload: Media[];
	updatePayload: (value: Media[]) => void;
}

interface UpdateProductModal {
	isOpen: boolean;
	payload: Product;
	onOpen: () => void;
	onClose: () => void;
	updatePayload: (value: Product) => void;
}

interface DeleteProductModal  extends ActivateModal {
	payload: {id: string; name: string};
	updatePayload: (value: Product) => void;
}

export const useUpdateVendorProfileModalStore =
	create<ActivateModal>((set) => ({
		isOpen: false,
		onOpen: () => set({isOpen: true}),
		onClose: () => set({isOpen: false}),
	})
);

export const useCreatePromotionModalStore =	create<ActivateModal>((set) => ({
		isOpen: false,
		onOpen: () => set({isOpen: true}),
		onClose: () => set({isOpen: false}),
	})
);

export const useShareSellerStoreModalStore = create<ActivateModal>((set) => ({
		isOpen: false,
		onOpen: () => set({isOpen: true}),
		onClose: () => set({isOpen: false}),
	})
);

export const useReadNotificationModalStore = create<ReadNotificationModal>(
	(set) => ({
		isOpen: false,
		payload: null,
		onOpen: () => set({isOpen: true}),
		onClose: () => set({isOpen: false}),
		updatePayload: (value: Notification) => set({payload: value}),
	})
);

export const useUpdateWelcomeFarmerModalStore = create<ActivateModal>(
	(set) => ({
		isOpen: false,
		onOpen: () => set({isOpen: true}),
		onClose: () => set({isOpen: false}),
	})
);

export const useUpdateSearchLocationModalStore = create<ActivateModal>(
	(set) => ({
		isOpen: false,
		onOpen: () => set({isOpen: true}),
		onClose: () => set({isOpen: false}),
	})
);

export const useUpdateUserRoleModalStore = create<ActivateModal>(
	(set) => ({
		isOpen: false,
		onOpen: () => set({isOpen: true}),
		onClose: () => set({isOpen: false}),
	})
);

export const useProductUploadSubscriptionModalStore = create<ActivateModal>((set) => ({
	isOpen: false,
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
}));

export const useCreateProductModalStore = create<ActivateModal>((set) => ({
	isOpen: false,
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
}));

export const useDownloadAppStore = create<ActivateModal>((set) => ({
	isOpen: false,
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
}));

export const useUpgradeToPremiumAccessStore = create<ActivateModal>((set) => ({
	isOpen: false,
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
}));

export const usePremiumSubscriptionCheckoutModalStore =	create<ActivateModal>((set) => ({
	isOpen: false,
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
}));

export const usePremiumSubscriptionSuccessModalStore =	create<ActivateModal>((set) => ({
	isOpen: false,
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
}));

export const useReferralModalStore =	create<ActivateModal>((set) => ({
	isOpen: false,
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
}));

export const useUpdateProductModalStore = create<UpdateProductModal>((set) => ({
	isOpen: false,
	payload: {
		id: '',
		productId: '',
		name: '',
		price: 0,
		discountPrice: 0,
		category: '',
		impressionCount: 0,
		description: '',
		inStock: false,
		isPromotion: false,
		isNegotiable: false,
		totalReviews: 0,
		viewCount: 0,
		likeCount: 0,
		purchaseCount: 0,
		likedUsers: null,
		media: [],
		createdAt: '',
		user: 0,
	},
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
	updatePayload: (value: Product) => set({payload: value}),
}));

export const useShareProductModalStore = create<UpdateProductModal>((set) => ({
	isOpen: false,
	payload: {
		id: '',
		productId: '',
		name: '',
		price: 0,
		discountPrice: 0,
		impressionCount: 0,
		category: '',
		description: '',
		inStock: false,
		isPromotion: false,
		isNegotiable: false,
		totalReviews: 0,
		viewCount: 0,
		likeCount: 0,
		purchaseCount: 0,
		likedUsers: null,
		media: [],
		createdAt: '',
		user: 0,
	},
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
	updatePayload: (value: Product) => set({payload: value}),
}));

export const useShareNewProductModalStore = create<UpdateProductModal>((set) => ({
	isOpen: false,
	payload: {
		id: '',
		productId: '',
		name: '',
		price: 0,
		discountPrice: 0,
		category: '',
		impressionCount: 0,
		description: '',
		inStock: false,
		isPromotion: false,
		isNegotiable: false,
		totalReviews: 0,
		viewCount: 0,
		likeCount: 0,
		purchaseCount: 0,
		likedUsers: null,
		media: [],
		createdAt: '',
		user: 0,
	},
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
	updatePayload: (value: Product) => set({payload: value}),
}));

export const useDeleteProductModalStore = create<DeleteProductModal>((set) => ({
	isOpen: false,
	payload: {
		id: '',
		name: '',
	},
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
	updatePayload: (value: Product) => set({payload: value}),
}));

export const useProductMediaModalStore = create<ProductModal>((set) => ({
	isOpen: false,
	payload: [],
	onOpen: () => set({isOpen: true}),
	onClose: () => set({isOpen: false}),
	updatePayload: (value: Media[]) => set({payload: value}),
}));

export const useGlobalStore = create<GlobalStore>((set) => ({
	socket: null,
	cookieConsentStatus: false,
	chatConversation: null,
	chatConversations: [],
	testimonials: [],
	chatConversationMessages: [],
	userPremiumSubscription: null,
	premiumSubscriptionPlans: [],
	productUploadSubscriptionPlans: [],
	showChatConversation: false,
	searchQuery: '',
	searchQueryState: '',
	searchLocationState: '',
	searchQueryCity: 'Nigeria',
	user: null,
	blog: null,
	blogs: [],
	desiredProductInfo: null,
	desiredProduct: null,
	desiredProducts: [],
	notifications: [],
	vendors: [],
	billing: null,
	vendor: null,
	searchProducts: [],
	products: [],
	sellerProducts: [],
	totalPages: 0,
	searchTotalPages: 0,
	searchHasNextPage: false,
	sellerTotalPages: 0,
	sellerHasNextPage: false,
	product: null,
	hasNextPage: false,
	productInfo: null,
	currentAccountTab: 'Account',
	promotionPlans: [],
	vendorProfile: null,
	userPromotionPlan: null,
	promotions: [],
	promotionProductsInfo: [],
	currentPromotionPlan: 0,
	promotionsTotalPages: 0,
	promotionsHasNextPage: false,
	showPromotionInfo: false,
	currentPromotion: null,
	promotionProducts: [],
	promotionInfoProducts: [],
	promotionProductsTotalPages: 0,
	promotionProductsHasNextPage: false,
	premiumSubscriptionPlanId: 0,
	premiumSubscriptionPlanAmount: 0,
	updateBlog: (value: BlogItem) => set({blog: value}),
	updateBlogs: (value: BlogItem[]) => set({blogs: value}),
	updateTestimonials: (value: Testimonial[]) => set({testimonials: value}),
	updatePremiumSubscriptionPlanInfo: (id: number, amount: number) => set({premiumSubscriptionPlanId: id, premiumSubscriptionPlanAmount: amount}),
	updateUserPremiumSubscription: (value: PremiumSubscription|null) => set({userPremiumSubscription: value}),
	updatePremiumSubscriptionPlans: (value: PremiumSubscriptionPlan[]) => set({premiumSubscriptionPlans: value}),
	updatePromotionInfoProducts: (value: Product[]) => set({promotionInfoProducts: value}),
	updatePromotionProducts: (value: Product[]) => set({promotionProducts: value}),
	updateCurrentPromotion: (value: Promotion | null) => set({currentPromotion: value}),
	updateShowPromotionInfo: (value: boolean) => set({showPromotionInfo: value}),
	updateCurrentPromotionPlan: (value: number) => set({currentPromotionPlan: value}),
	updatePromotionPlans: (value: PromotionPlan[]) => set({promotionPlans: value}),
	updateProductUploadSubscriptionPlans: (value: ProductUploadSubscriptionPlan[]) => set({productUploadSubscriptionPlans: value}),
	updateUserPromotionPlan: (value: UserPromotionPlan) => set({userPromotionPlan: value}),
	updatePromotions: (value: Promotion[]) => set({promotions: value}),
	updatePromotionProductsInfo: (value: PromotionProductInfo[]) => set({promotionProductsInfo: value}),
	updatePromotionsPagination: (totalPages: number, hasNextPage: boolean) => set({promotionsTotalPages: totalPages, promotionsHasNextPage: hasNextPage}),
	updatePromotionProductsPagination: (totalPages: number, hasNextPage: boolean) => set({promotionProductsTotalPages: totalPages, promotionProductsHasNextPage: hasNextPage}),
	updateCookieConsentStatus: (value: boolean) => set({cookieConsentStatus: value}),
	updateChatConversation: (value: ChatConversation| null) => set({chatConversation: value}),
	updateChatConversations: (value: ChatConversation[]) => set({chatConversations: value}),
	addChatConversationMessage: (newMessage: ChatMessage) => {
		set((state)=>{
			const messages = [...state.chatConversationMessages, newMessage];

			return {chatConversationMessages: messages};
		});
	},
	updateChatConversationMessages: (value: ChatMessage[]) => set({chatConversationMessages: value}),
	updateSocketInstance: (value: Socket) => set({socket: value}),
	updateShowChatConversation: (value: boolean) => set({showChatConversation: value}),
	updateSearchQuery: (searchQuery: string) => set({searchQuery: searchQuery}),
	updateSearchLocation: (searchQueryCity: string, searchQueryState: string) => set({searchQueryCity: searchQueryCity, searchQueryState: searchQueryState}),
	updateNotifications: (value: Notification[]) => set({notifications: value}),
	updateDesiredProductInfo: (value: DesiredItemInfo) => set({desiredProductInfo: value}),
	updateDesiredProduct: (value: DesiredItem) => set({desiredProduct: value}),
	updateDesiredProducts: (value: DesiredItem[]) => set({desiredProducts: value}),
	updateVendors: (value: Vendor[]) => set({vendors: value}),
	updateCurrentAccountTab: (value: Tab) => set({currentAccountTab: value}),
	updateProductInfo: (value: ProductInfo) => set({productInfo: value}),
	updateVendor: (value: Vendor | null) => set({vendor: value}),
	updateVendorProfile: (value: Vendor | null) => set({vendorProfile: value}),
	updateBilling: (value: Billing | null) => set({billing: value}),
	updateUser: (value: User | null) => set({user: value}),
	updatePayload: (value: Product) => set({product: value}),
	updateProduct: (productId: string, product: Product) => {
		set((state) => {
			const index = state.products.findIndex(
				(prod) => prod.id === productId
			);

			const updatedProducts = [...state.products];
			updatedProducts[index] = product;

			return {products: updatedProducts};
		});
	},
	updateNotification: (
		notificationId: number,
		notification: Notification
	) => {
		set((state) => {
			const index = state.notifications.findIndex(
				(notification) => notification.id === notificationId
			);

			const updatedNotifications = [...state.notifications];
			updatedNotifications[index] = notification;

			return {notifications: updatedNotifications};
		});
	},
	updatePagination: (totalPages: number, hasNextPage: boolean) => set({totalPages: totalPages, hasNextPage: hasNextPage}),
	updateSearchPagination: (totalPages: number, hasNextPage: boolean) => set({searchTotalPages: totalPages, searchHasNextPage: hasNextPage}),
	updateSellerPagination: (totalPages: number, hasNextPage: boolean) => set({sellerTotalPages: totalPages, sellerHasNextPage: hasNextPage}),
	updateProducts: (products: Product[]) => set({products: products}),
	updateSearchProducts: (products: Product[]) => set({searchProducts: products}),
	updateSellerProducts: (products: Product[]) => set({sellerProducts: products}),
}));
