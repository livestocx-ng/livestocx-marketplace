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
} from '@/types/types';
import {create} from 'zustand';

interface GlobalStore {
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
	totalPages: number;
	hasNextPage: boolean;
	currentAccountTab: Tab | 'Account' | null;
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
	updateProductInfo: (value: ProductInfo) => void;
	updateProduct: (productId: string, product: Product) => void;
	updatePagination: (totalPages: number, hasNextPage: boolean) => void;
}

interface UpdateGoogleProfileModal {
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

export const useUpdateGoogleProfileModalStore =
	create<UpdateGoogleProfileModal>((set) => ({
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
	user: null,
	desiredProductInfo: null,
	desiredProduct: null,
	desiredProducts: [],
	notifications: [],
	vendors: [],
	billing: null,
	vendor: null,
	products: [],
	totalPages: 1,
	product: null,
	hasNextPage: false,
	productInfo: null,
	currentAccountTab: 'Account',
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
	updateProducts: (products: Product[]) => set({products: products}),
}));
