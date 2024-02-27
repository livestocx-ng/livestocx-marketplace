'use client';
import {cn} from '@/lib/utils';
import Image from 'next/image';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Lottie from 'lottie-react';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {ProductInfo} from '@/types/types';
import {useGlobalStore} from '@/hooks/use-global-store';
import AuthHeader from '@/components/header/auth-header';
import {useProductMediaModalStore} from '@/hooks/use-global-store';
import SingleProductContent from '@/components/product/single-product-content';
import EmptyAnimation from '../../../../../../../../../public/animations/animation__2.json';
import ProductMediaModal from '../../../../../../../../components/modals/product/product-media-modal';
import LoadingAnimation from '../../../../../../../../../public/animations/loading__animation__1.json';

interface SellerProductPageParams {
	params: {
		productId: string;
	};
}

type Tab = 'Seller Info' | 'Review' | 'More From Seller';

const CurrentTabs: Tab[] = ['Seller Info', 'Review', 'More From Seller'];

const SellerProductPage = ({params: {productId}}: SellerProductPageParams) => {
	const isProductMediaModalOpen = useProductMediaModalStore(
		(state) => state.isOpen
	);

	const {
		user,
		product,
		vendor,
		productInfo,
		updatePayload,
		updateProductInfo,
	} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [currentTab, setCurrentTab] = useState<Tab>('Seller Info');

	// console.log('[PRODUCT-ID] :: ', productId);

	const fetchProduct = async () => {
		try {
			const [_product, _productInfo] = await Promise.all([
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/products/product/${productId}`
				),
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/products/info/${productId}`
				),
			]);

			// console.log('[DATA] ::  ', _product.data.data);
			// // console.log('[DATA] ::  ', data);

			updatePayload(_product.data.data);
			updateProductInfo(_productInfo.data.data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCT-ERROR] :: ', _error);
		}
	};

	const viewProduct = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/product/${productId}/view`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			console.log('[VIEW-PRODUCT-DATA] ::  ', data);
		} catch (error) {
			const _error = error as AxiosError;

			console.log('[VIEW-PRODUCT-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchProduct();
	}, []);

	useEffect(() => {
		if (user) {
			viewProduct();
		}
	}, [user]);

	const handleLikeUnlikeProduct = async (formData: {value?: boolean}) => {
		try {
			setLoading(true);

			// console.log('[LIKE-UNLIKE-PRODUCT-PAYLOAD] :: ', formData);

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/like-unlike-product?productId=${product?.productId}`,
				formData,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[LIKE-UNLIKE-PRODUCT-SUCCESS] :: ', data);

			setLoading(false);

			updatePayload(data.data);
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;

			// console.log('[ERROR] :: ', _error);
		}
	};

	const handleAddToDesiredProducts = async () => {
		try {
			if (!user) return;

			if (loading) return;

			setLoading(true);

			// console.log('[ADD-DESIRED-PRODUCT] :: ');

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/add-desired-product?productId=${product?.productId}`,
				{},
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[ADD-DESIRED-PRODUCT-SUCCESS] :: ', data);

			setLoading(false);

			if (data.data === false) {
				return toast.success('Product already added to desired items');
			} else {
				return toast.success('Product added to desired items');
			}
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;

			// console.log('[ERROR] :: ', _error);
		}
	};

	return (
		<main className='w-full relative'>
			{isProductMediaModalOpen && <ProductMediaModal />}

			<section className='sm:h-[35vh] w-full bg-home flex flex-col items-center justify-center gap-y-16 pt-28 pb-20 sm:pb-0 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					{vendor?.name}
				</h1>
			</section>

			{loading && (
				<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
					<div className='h-[200px] w-1/2 mx-auto bg-white'>
						<Lottie
							loop={true}
							className='h-full'
							animationData={LoadingAnimation}
						/>
					</div>
				</div>
			)}

			{!loading && !product && (
				<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
					<div className='h-[200px] w-1/2 mx-auto bg-white'>
						<Lottie
							loop={true}
							className='h-full'
							animationData={EmptyAnimation}
						/>
					</div>
				</div>
			)}

			{!loading && product && (
				<SingleProductContent
					loading={loading}
					product={product}
					currentTab={currentTab}
					productInfo={productInfo}
					setCurrentTab={setCurrentTab}
					handleLikeUnlikeProduct={handleLikeUnlikeProduct}
					handleAddToDesiredProducts={handleAddToDesiredProducts}
				/>
			)}
		</main>
	);
};

export default SellerProductPage;
