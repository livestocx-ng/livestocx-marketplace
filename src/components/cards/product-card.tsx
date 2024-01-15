'use client';
import Image from 'next/image';
import {useState} from 'react';
import {
	useGlobalStore,
	useShareProductModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import {Product} from '@/types/types';
import axios, {AxiosError} from 'axios';
import {usePathname, useRouter} from 'next/navigation';
import {PriceFormatter} from '@/utils/price.formatter';
import {Forward, ShoppingCartIcon, ThumbsDown, ThumbsUp} from 'lucide-react';

interface ProductCardProps {
	product: Product | null;
}

const ProductCard = ({product}: ProductCardProps) => {
	const router = useRouter();
	const pathName = usePathname();

	const shareProductModal = useShareProductModalStore();
	const {user, vendor, updateProduct} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);

	const handleShareProductModal = () => {
		shareProductModal.updatePayload(product!);

		shareProductModal.onOpen();
	};

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

			updateProduct(product?.id!, data.data);
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;

			// console.log('[ERROR] :: ', _error);
		}
	};

	const handleAddToDesiredProducts = async () => {
		try {
			if (loading) return;

			if (!user) return router.push('/signin');

			// // console.log('[ADD-DESIRED-PRODUCT] :: ');

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/add-desired-product?productId=${product?.productId}`,
				{},
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			// // console.log('[ADD-DESIRED-PRODUCT-SUCCESS] :: ', data);

			// setLoading(false);

			if (data.data === false) {
				return toast.success('Product already added to desired items');
			} else {
				return toast.success('Product added to desired items');
			}
		} catch (error) {
			// setLoading(false);
			const _error = error as AxiosError;

			// console.log('[ERROR] :: ', _error);
		}
	};

	return (
		<div className='w-[48%] sm:w-[150px] flex flex-col justify-between shadow__1 rounde relative'>
			<div
				onClick={() => {
					if (
						!pathName.includes('marketplace') &&
						!pathName.includes('sellers')
					) {
						return router.push(
							`/marketplace/products/${product?.productId!.toLowerCase()}`
						);
					}
					if (pathName.includes('marketplace')) {
						return router.push(
							`/marketplace/products/${product?.productId!.toLowerCase()}`
						);
					}
					if (pathName.includes('sellers')) {
						return router.push(
							`/sellers/${vendor?.vendorId!.toLowerCase()}/products/${product?.productId!.toLowerCase()}`
						);
					}
				}}
				className='h-[180px] relative rounde-t cursor-pointer rela'
			>
				<Image
					fill
					alt='product'
					src={
						product?.media?.find(
							(media) =>
								media.mediaUrl.includes('.jpeg') ||
								media.mediaUrl.endsWith('.jpg') ||
								media.mediaUrl.endsWith('.png')
						)?.mediaUrl!
					}
					className='object-cover rounde-t'
				/>

				{product?.isNegotiable === true && (
					<div className='absolute top-0 left-0 bg-[#11111180] px-4 rounde-tl'>
						<p className='text-[10px] text-white'>Negotiable</p>
					</div>
				)}
			</div>

			<div className='flex flex-col justify-between bg-orange-100 border border-t-0 border-slate-400 py-2 relative h-[150px]'>
				<div className='space-y-1'>
					<div className='flex justify-between items-center sm:px-2'>
						<div
							onClick={() => {
								if (loading) return;

								if (!user) return router.push('/signin');

								const formData: {value?: boolean} = {};
								if (product?.likedUsers?.includes(user?.id!)) {
									formData.value = false;
								} else {
									formData.value = true;
								}

								handleLikeUnlikeProduct(formData);
							}}
							className=' flex items-center justify-center h-8 sm:h-8 w-8 sm:w-8 bg-main rounded-full cursor-pointer'
						>
							{product?.likedUsers?.includes(user?.id!) ? (
								<ThumbsDown className='h-4 sm:h-4 w-4 sm:w-4 text-white' />
							) : (
								<ThumbsUp className='h-4 sm:h-4 w-4 sm:w-4 text-white' />
							)}
						</div>

						<div
							onClick={handleAddToDesiredProducts}
							className=' flex items-center justify-center h-8 sm:h-8 w-8 sm:w-8 bg-main rounded-full cursor-pointer'
						>
							<ShoppingCartIcon className='h-4 sm:h-4 w-4 sm:w-4 text-white' />
						</div>

						<div
							onClick={handleShareProductModal}
							className=' flex items-center justify-center h-8 sm:h-8 w-8 sm:w-8 bg-main rounded-full cursor-pointer'
						>
							<Forward className='h-4 sm:h-4 w-4 sm:w-4 text-white' />
						</div>
					</div>

					<div className='text-xs sm:text-sm font-semibold sm:px-2'>
						{product?.name.length! > 15
							? `${product?.name.slice(0, 15)}...`
							: product?.name}
					</div>
					{product?.isNegotiable && (
						<div className='text-xs sm:text-sm text-main font-medium sm:px-2'>
							{PriceFormatter(product?.discountPrice!)}
						</div>
					)}
					<div
						className={`text-xs sm:text-sm font-medium sm:px-2 ${
							product?.isNegotiable
								? 'line-through text-slate-500'
								: 'text-main'
						}`}
					>
						{PriceFormatter(product?.price!)}
					</div>
				</div>

				{/* <div className='border-t border-slate-400 text-xs font-medium px-2'>{product?.vendor?.state}</div> */}
			</div>
		</div>
	);
};

export default ProductCard;
