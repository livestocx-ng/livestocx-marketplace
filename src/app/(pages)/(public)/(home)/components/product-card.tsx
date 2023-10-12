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
			className='xs:w-[160px] sm:w-[300px] h-[180px] sm:h-[300px] flex flex-col justify-between relative cursor-pointer'
		>
			<div className='h-[70%] sm:h-[75%] relative rounded-t-lg'>
				<Image
					fill
					alt='product'
					src='/product__1.jpg'
					className='objec object-fill'
				/>
			</div>

			<div className='h-[30%] sm:h-[25%] flex flex-col justify-end bg-orange-100 rounded-b-lg p-4'>
				<div className='text-sm sm:text-base'>6 weeks broilers</div>
				<div className='text-sm sm:text-base text-main'>&#8358;5,400 - &#8358;6,000</div>
			</div>

			<div className='absolute right-4 bottom-14 flex items-center justify-center h-10 w-10 bg-main rounded-full'>
				<ShoppingCartIcon className='h-5 w-5 text-white' />
			</div>
		</div>
	);
};

export default ProductCard;
