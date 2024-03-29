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
	vendor: Vendor | null;
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
	sellerTotalPages: number;
	sellerHasNextPage: boolean;
	currentAccountTab: Tab | 'Account' | null;
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
	updateSellerPagination: (totalPages: number, hasNextPage: boolean) => void;
}

interface UpdateVendorProfileModal {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

interface ReadNotificationModal {
	isOpen: boolean;
	payload: Notification | null;
	onOpen: () => void;
	onClose: () => void;
	updatePayload: (value: Notification) => void;
}

interface WelcomeFarmerModal {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

interface UpdateSearchLocationModal {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

interface ProductModal {
	isOpen: boolean;
	payload: Media[];
	onOpen: () => void;
	onClose: () => void;
	updatePayload: (value: Media[]) => void;
}

interface UpdateUserRoleModal {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

interface CreateProductModal {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

interface UpdateProductModal {
	isOpen: boolean;
	payload: Product;
	onOpen: () => void;
	onClose: () => void;
	updatePayload: (value: Product) => void;
}

interface DeleteProductModal {
	isOpen: boolean;
	payload: {id: string; name: string};
	onOpen: () => void;
	onClose: () => void;
	updatePayload: (value: Product) => void;
}

export const useUpdateVendorProfileModalStore =
	create<UpdateVendorProfileModal>((set) => ({
		isOpen: false,
		onOpen: () => set({isOpen: true}),
		onClose: () => set({isOpen: false}),
	}));

export const useReadNotificationModalStore = create<ReadNotificationModal>(
	(set) => ({
		isOpen: false,
		payload: null,
		onOpen: () => set({isOpen: true}),
		onClose: () => set({isOpen: false}),
		updatePayload: (value: Notification) => set({payload: value}),
	})
);

export const useUpdateWelcomeFarmerModalStore = create<WelcomeFarmerModal>(
	(set) => ({
		isOpen: false,
		onOpen: () => set({isOpen: true}),
		onClose: () => set({isOpen: false}),
	})
);

export const useUpdateSearchLocationModalStore = create<UpdateSearchLocationModal>(
	(set) => ({
		isOpen: false,
		onOpen: () => set({isOpen: true}),
		onClose: () => set({isOpen: false}),
	})
);

export const useUpdateUserRoleModalStore = create<UpdateUserRoleModal>(
	(set) => ({
		isOpen: false,
		onOpen: () => set({isOpen: true}),
		onClose: () => set({isOpen: false}),
	})
);

export const useCreateProductModalStore = create<CreateProductModal>((set) => ({
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
		description: '',
		inStock: false,
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
		category: '',
		description: '',
		inStock: false,
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
		description: '',
		inStock: false,
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
	chatConversationMessages: [],
	showChatConversation: false,
	searchQuery: '',
	searchQueryState: '',
	searchLocationState: '',
	searchQueryCity: 'Nigeria',
	user: null,
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
	sellerTotalPages: 0,
	sellerHasNextPage: false,
	product: null,
	hasNextPage: false,
	productInfo: null,
	currentAccountTab: 'Account',
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
	updateShowChatConversation: (value: boolean) =>
	set({showChatConversation: value}),
	updateSearchQuery: (searchQuery: string) =>
	set({searchQuery: searchQuery}),
	updateSearchLocation: (searchQueryCity: string, searchQueryState: string) =>
		set({searchQueryCity: searchQueryCity, searchQueryState: searchQueryState}),
	updateNotifications: (value: Notification[]) => set({notifications: value}),
	updateDesiredProductInfo: (value: DesiredItemInfo) =>
		set({desiredProductInfo: value}),
	updateDesiredProduct: (value: DesiredItem) => set({desiredProduct: value}),
	updateDesiredProducts: (value: DesiredItem[]) =>
		set({desiredProducts: value}),
	updateVendors: (value: Vendor[]) => set({vendors: value}),
	updateCurrentAccountTab: (value: Tab) => set({currentAccountTab: value}),
	updateProductInfo: (value: ProductInfo) => set({productInfo: value}),
	updateVendor: (value: Vendor | null) => set({vendor: value}),
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
	updatePagination: (totalPages: number, hasNextPage: boolean) =>
		set({totalPages: totalPages, hasNextPage: hasNextPage}),
	updateSellerPagination: (totalPages: number, hasNextPage: boolean) =>
		set({sellerTotalPages: totalPages, sellerHasNextPage: hasNextPage}),
	updateProducts: (products: Product[]) => set({products: products}),
	updateSearchProducts: (products: Product[]) =>
		set({searchProducts: products}),
	updateSellerProducts: (products: Product[]) =>
		set({sellerProducts: products}),
}));
