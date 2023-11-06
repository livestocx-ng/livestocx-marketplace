'use client';

import Image from 'next/image';
import {ShoppingCartIcon, ThumbsUp} from 'lucide-react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

const ProductCard = () => {
	const router = useRouter();

	return (
		<Link
			href={'/U9IKL9101'}
			// onClick={() => {
			// 	router.push('/U9IKL9101');
			// }}
			className='w-[140px] sm:w-[180px] flex flex-col justify-between cursor-pointer shadow__1 rounded-lg'
		>
			<div className='h-[120px] sm:h-[120px] relative rounded-t-lg'>
				<Image
					fill
					alt='product'
					src='/product__4.jpg'
					className='objec object-fill rounded-t-lg'
				/>
			</div>

			<div className='flex flex-col justify-end bg-orange-100 px-1 sm:px-2 py-6 rounded-b-lg relative'>
				<div className='text-xs sm:text-sm font-semibold'>
					6 weeks broilers
				</div>
				<div className='text-xs sm:text-sm text-main font-medium'>
					&#8358;5,400 - &#8358;6,000
				</div>

				<div className='absolute right-14 bottom-[70px] flex items-center justify-center h-6 sm:h-8 w-6 sm:w-8 bg-main rounded-full'>
					<ThumbsUp className='h-3 sm:h-4 w-3 sm:w-4 text-white' />
				</div>
				<div className='absolute right-4 bottom-[70px] flex items-center justify-center h-6 sm:h-8 w-6 sm:w-8 bg-main rounded-full'>
					<ShoppingCartIcon className='h-3 sm:h-4 w-3 sm:w-4 text-white' />
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
