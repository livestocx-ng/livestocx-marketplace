'use client';

import Image from 'next/image';
import {ShoppingCartIcon, ThumbsUp} from 'lucide-react';
import {useRouter} from 'next/navigation';

const ProductCard = () => {
	const router = useRouter();

	return (
		<div className='relative'>
			<div
				onClick={() => {
					router.push('/U9IKL9101');
				}}
				className='w-[140px] sm:w-[140px] flex flex-col justify-between  cursor-pointer shadow__1 rounded-lg'
			>
				<div className='h-[120px] sm:h-[120px] relative rounded-t-lg'>
					<Image
						fill
						alt='product'
						src='/product__4.jpg'
						className='objec object-fill rounded-t-lg'
					/>
				</div>

				<div className='flex flex-col justify-end bg-orange-100 px-1 sm:px-2 py-6 rounded-b-lg'>
					<div className='text-xs sm:text-sm font-semibold'>
						6 weeks broilersbroilers
					</div>
					<div className='text-xs sm:text-sm text-main font-medium'>
						&#8358;5,400 - &#8358;6,000
					</div>
				</div>
			</div>

			<div className='absolute right-14 bottom-[90px] flex items-center justify-center h-8 w-8 bg-main rounded-full'>
				<ThumbsUp className='h-4 w-4 text-white' />
			</div>
			<div className='absolute right-4 bottom-[90px] flex items-center justify-center h-8 w-8 bg-main rounded-full'>
				<ShoppingCartIcon className='h-4 w-4 text-white' />
			</div>
		</div>
	);
};

export default ProductCard;
