import {Product} from '@/types/types';
import {create} from 'zustand';

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

interface GlobalStore {
	products: Product[];
	updateProducts: (products: Product[]) => void;
}

export const useUpdateProductModalStore = create<UpdateProductModal>((set) => ({
	isOpen: false,
	payload: {
		id: '',
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

export const useGlobalStore = create<GlobalStore>((set) => ({
	products: [],
	updateProducts: (products: Product[]) => set({products: products}),
}));
