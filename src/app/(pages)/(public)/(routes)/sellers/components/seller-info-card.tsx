import React from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

const SellerInfoCard = () => {
	const router = useRouter();

	return (
		<Link
			// onClick={() => {
			// 	router.push('/sellers/IOSJWUI');
			// }}
			href={'/sellers/IOSJWUI'}
			className='w-full sm:w-[300px] bg-green-100 flex flex-col justify-between relative cursor-pointer shadow__1 hover:shadow__2 rounded-lg px-4 py-5'
		>
			<div className='border-b border-b-main flex flex-col space-y-5 pb-2'>
				<div className='flex justify-end'>
					<Image
						alt='logo'
						width={60}
						height={60}
						className=''
						src={'/logo.svg'}
					/>
				</div>

				<h1 className='text-sm'>MANSUR AK INTEGRATED FARM</h1>
				<p className='text-xs'>
					Unguwa uku yanawaki kano, KANO STATE, Kano, Nigeria
				</p>
			</div>

			<div className='flex flex-wrap items-center justify-between py-2'>
				<Image
					alt='image'
					width={50}
					height={50}
					src={'/user__1.svg'}
					className='rounded-full'
				/>

				<div className='flex flex-row sm:flex-col space-x-5 sm:space-x-0 sm:space-y-2'>
					<Button
						type='button'
						variant={'outline'}
						className='borde bg-main text-white text-xs h-12 rounded-md py-3'
					>
						View Profile
					</Button>
					<Button
						type='button'
						variant={'outline'}
						className='bg-orange-500 text-white text-xs h-12 rounded-md py-3'
					>
						Chat with Seller
					</Button>
				</div>
			</div>
		</Link>
	);
};

export default SellerInfoCard;
