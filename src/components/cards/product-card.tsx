'use client';
import Link from 'next/link';
import Image from 'next/image';
import {toast} from 'react-hot-toast';
import {Product} from '@/types/types';
import axios, {AxiosError} from 'axios';
import {PriceFormatter} from '@/utils/price.formatter';
import {useGlobalStore} from '@/hooks/use-global-store';
import {ShoppingCartIcon, ThumbsDown, ThumbsUp} from 'lucide-react';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

interface ProductCardProps {
	product: Product | null;
}

const ProductCard = ({product}: ProductCardProps) => {
	const router = useRouter();

	const {user, updateProduct} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);

	const handleLikeUnlikeProduct = async (formData: {value?: boolean}) => {
		try {
			setLoading(true);

			console.log('[LIKE-UNLIKE-PRODUCT-PAYLOAD] :: ', formData);

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/like-unlike-product?productId=${product?.productId}`,
				formData,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			console.log('[LIKE-UNLIKE-PRODUCT-SUCCESS] :: ', data);

			setLoading(false);

			updateProduct(product?.id!, data.data);
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;

			console.log('[ERROR] :: ', _error);
		}
	};

	return (
		<div
			// href={`${product.productId}`}
			// onClick={() => {
			// 	router.push('/U9IKL9101');
			// }}
			className='w-[140px] sm:w-[180px] flex flex-col justify-between shadow__1 rounded-lg'
		>
			<div
				// href={`${product?.productId}`}
				onClick={() => {
					router.push(`/${product?.productId!.toLowerCase()}`);
				}}
				className='h-[120px] sm:h-[160px] relative rounded-t-lg cursor-pointer'
			>
				<Image
					fill
					alt='product'
					src={product?.media[0]?.mediaUrl!}
					className='object-fill rounded-t-lg'
				/>

				{product?.isNegotiable && (
					<div className='absolute top-0 left-0 bg-[#11111180] px-4 rounded-tl-lg'>
						<p className='text-[10px] text-white'>Negotiable</p>
					</div>
				)}
			</div>

			<div className='flex flex-col justify-end bg-orange-100 px-1 sm:px-2 py-6 rounded-b-lg relative'>
				<div className='text-xs sm:text-sm font-semibold'>
					{product?.name}
				</div>
				<div className='text-xs sm:text-sm text-main font-medium'>
					{PriceFormatter(product?.price!)}
				</div>

				{user && (
					<div
						onClick={() => {
							if (loading) return;

							const formData: {value?: boolean} = {};
							if (product?.likedUsers?.includes(user?.id!)) {
								formData.value = false;
							} else {
								formData.value = true;
							}

							handleLikeUnlikeProduct(formData);
						}}
						className='absolute right-14 bottom-[70px] flex items-center justify-center h-6 sm:h-8 w-6 sm:w-8 bg-main rounded-full cursor-pointer'
					>
						{product?.likedUsers?.includes(user?.id!) ? (
							<ThumbsDown className='h-3 sm:h-4 w-3 sm:w-4 text-white' />
						) : (
							<ThumbsUp className='h-3 sm:h-4 w-3 sm:w-4 text-white' />
						)}
					</div>
				)}
				{/* {product?.likedUsers?.includes(parseInt(user?.id!)) && (
					<div
						onClick={() => {
							const formData: {value: boolean} = {
								value: false,
							};

							handleLikeUnlikeProduct(formData);
						}}
						className='absolute right-14 bottom-[70px] flex items-center justify-center h-6 sm:h-8 w-6 sm:w-8 bg-main rounded-full cursor-pointer'
					>
						<ThumbsDown className='h-3 sm:h-4 w-3 sm:w-4 text-white' />
					</div>
				)} */}
				<div className='absolute right-4 bottom-[70px] flex items-center justify-center h-6 sm:h-8 w-6 sm:w-8 bg-main rounded-full'>
					<ShoppingCartIcon className='h-3 sm:h-4 w-3 sm:w-4 text-white' />
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
