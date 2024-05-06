'use client';
import Image from 'next/image';
import {
	useGlobalStore,
	useProductMediaModalStore,
} from '@/hooks/use-global-store';
import Lottie from 'lottie-react';
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {ProductInfo} from '@/types/types';
import ProductMediaModal from '@/components/modals/product/product-media-modal';
import SingleProductContent from '@/components/product/single-product-content';
import EmptyAnimation from '../../../../../../../../public/animations/animation__3.json';
import LoadingAnimation from '../../../../../../../../public/animations/animation__3.json';
import {useRouter} from 'next/navigation';
import {getProductIdFromSlug} from '@/utils/slug.formatter';

interface ProductPageParams {
	params: {
		slug: string;
	};
}

type Tab = 'Seller Info' | 'Review' | 'More From Seller';

const CurrentTabs: Tab[] = ['Seller Info', 'Review', 'More From Seller'];

const MarketPlaceProductPage = ({params: {slug}}: ProductPageParams) => {
	const router = useRouter();

	const isProductMediaModalOpen = useProductMediaModalStore(
		(state) => state.isOpen
	);

	const {
		user,
		product,
		products,
		updatePayload,
		productInfo,
		updateProductInfo,
		updateChatConversation,
		updateCurrentAccountTab,
		updateShowChatConversation,
	} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [currentTab, setCurrentTab] = useState<Tab>('Seller Info');

	// console.log('[PRODUCT-ID] :: ', slug);

	const fetchProduct = async () => {
		try {
			const [_product, _productInfo] = await Promise.all([
				axios.get(
					`${
						process.env.NEXT_PUBLIC_API_URL
					}/user/products/product/${getProductIdFromSlug(slug)}`
				),
				axios.get(
					`${
						process.env.NEXT_PUBLIC_API_URL
					}/user/products/info/${getProductIdFromSlug(slug)}`
				),
			]);

			// // console.log('[DATA] ::  ', _product.data.data);
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
				`${
					process.env.NEXT_PUBLIC_API_URL
				}/user/products/product/${getProductIdFromSlug(slug)}/view`,
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
			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/like-unlike-product?productId=${product?.productId}`,
				formData,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updatePayload(data.data);
		} catch (error) {
			// setLoading(false);
			const _error = error as AxiosError;

			console.log('[ERROR] :: ', _error);
		}
	};

	const handleAddToDesiredProducts = async () => {
		try {
			if (!user) return;

			if (loading) return;

			console.log('[PRODUCT-USER] :: ', product?.user);

			if (user?.id === product?.user.toString()) return;

			await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/add-user-to-contact-seller?product=${product?.id}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/chat/conversation?receiver=${product?.user}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updateChatConversation(data.data);

			router.push('/account');

			updateCurrentAccountTab('Messages');

			updateShowChatConversation(true);

			// const {data} = await axios.post(
			// 	`${process.env.NEXT_PUBLIC_API_URL}/user/products/add-desired-product?productId=${product?.productId}`,
			// 	{},
			// 	{
			// 		headers: {
			// 			Authorization: user?.accessToken,
			// 		},
			// 	}
			// );

			// if (data.data === false) {
			// 	return toast.success('Product already added to desired items');
			// } else {
			// 	return toast.success('Product added to desired items');
			// }
		} catch (error) {
			// setLoading(false);
			const _error = error as AxiosError;

			// console.log('[ERROR] :: ', _error);
		}
	};

	return (
		<main className='w-full relative'>
			{isProductMediaModalOpen && <ProductMediaModal />}

			<section className='sm:h-[35vh] w-full bg-home flex flex-col items-center justify-center gap-y-16 pt-28 pb-20 sm:pb-0 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white capitalize px-6 sm:px-0 text-center'>
					{product?.name}
				</h1>

				{/* <SearchForm /> */}
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

export default MarketPlaceProductPage;

const ProductContactAlertDialog = ({
	productInfo,
}: {
	productInfo: ProductInfo | null;
}) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger className='border border-main text-main text-xs h-10 w-[45%] rounded-full py-2'>
				Show Contact
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{productInfo?.name!}</AlertDialogTitle>
					<AlertDialogDescription className='flex flex-col py-5 text-black'>
						<div className='relative w-[150px] h-[150px] mx-auto border'>
							<Image
								fill
								alt=''
								unoptimized={true}
								src={productInfo?.avatar!}
								className='object-fill w-full h-full'
							/>
						</div>
						<div className='grid grid-cols-2 gap-y-5 pt-2'>
							<p className='font-medium text-sm'>Email</p>
							<p>{productInfo?.email}</p>
							<p className='font-medium text-sm'>
								Contact number
							</p>
							<p>{productInfo?.phoneNumber}</p>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Close</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
