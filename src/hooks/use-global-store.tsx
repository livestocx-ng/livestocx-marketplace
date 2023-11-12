import {create} from 'zustand';
import {
	Billing,
	Media,
	Product,
	ProductInfo,
	Tab,
	User,
	Vendor,
} from '@/types/types';

interface GlobalStore {
	user: User | null;
	vendor: Vendor | null;
	vendors: Vendor[];
	billing: Billing | null;
	product: Product | null;
	productInfo: ProductInfo | null;
	products: Product[];
	totalPages: number;
	hasNextPage: boolean;
	currentAccountTab: Tab | 'Dashboard';
	updateVendors: (value: Vendor[]) => void;
	updateCurrentAccountTab: (value: Tab) => void;
	updatePayload: (value: Product) => void;
	updateVendor: (value: Vendor | null) => void;
	updateBilling: (value: Billing | null) => void;
	updateUser: (products: User | null) => void;
	updateProducts: (products: Product[]) => void;
	updateProductInfo: (value: ProductInfo) => void;
	// updateProductReview: (value: ProductReviewUpdate) => void;
	updateProduct: (productId: string, product: Product) => void;
	updatePagination: (totalPages: number, hasNextPage: boolean) => void;
}

interface ProductModal {
	isOpen: boolean;
	payload: Media[];
	onOpen: () => void;
	onClose: () => void;
	updatePayload: (value: Media[]) => void;
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
	vendors: [],
	billing: null,
	vendor: null,
	products: [],
	totalPages: 1,
	product: null,
	hasNextPage: false,
	productInfo: null,
	currentAccountTab: 'Dashboard',
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
	updatePagination: (totalPages: number, hasNextPage: boolean) =>
		set({totalPages: totalPages, hasNextPage: hasNextPage}),
	updateProducts: (products: Product[]) => set({products: products}),
	// updateProductReview: (value: ProductReviewUpdate) =>
	// 	set({productInfo: value}),
}));
