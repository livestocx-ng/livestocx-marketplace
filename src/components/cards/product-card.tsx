'use client';

import Image from 'next/image';
import {ShoppingCartIcon} from 'lucide-react';
import {useRouter} from 'next/navigation';

const ProductCard = () => {
	const router = useRouter();

	return (
		<div
			onClick={() => {
				router.push('/U9IKL9101');
			}}
			className='w-[180px] sm:w-[180px] flex flex-col justify-between relative cursor-pointer shadow__1 rounded-lg'
		>
			<div className='h-[150px] sm:h-[150px] relative rounded-t-lg'>
				<Image
					fill
					alt='product'
					src='/product__4.jpg'
					className='objec object-fill rounded-t-lg'
				/>
			</div>

			<div className='flex flex-col justify-end bg-orange-100 px-4 py-6 rounded-b-lg'>
				<div className='text-sm sm:text-base'>6 weeks broilers</div>
				<div className='text-sm sm:text-base text-main'>
					&#8358;5,400 - &#8358;6,000
				</div>
			</div>

			<div className='absolute right-4 bottom-[75px] flex items-center justify-center h-10 w-10 bg-main rounded-full'>
				<ShoppingCartIcon className='h-5 w-5 text-white' />
			</div>
		</div>
	);
};

export default ProductCard;
