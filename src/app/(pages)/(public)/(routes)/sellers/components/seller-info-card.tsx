import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Vendor} from '@/types/types';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {useGlobalStore} from '@/hooks/use-global-store';

const SellerInfoCard = ({vendor}: {vendor: Vendor}) => {
	const {updateVendor} = useGlobalStore();

	return (
		<div className='w-full sm:w-[300px] bg-green-100 flex flex-col justify-between relative cursor-pointe shadow__1 hover:shadow__2 rounded-lg px-4 py-5'>
			<div className='border-b border-b-main flex flex-col space-y-5 pb-2'>
				<div className='flex justify-end'>
					<Image
						alt='logo'
						width={60}
						height={60}
						className=''
						// src={vendor?.avatar}
						src={'/logo.svg'}
					/>
				</div>

				<h1 className='text-sm uppercase font-medium'>{vendor.name}</h1>
				<p className='text-xs'>
					{vendor.address} {vendor.state} State.
				</p>
			</div>

			<div className='flex flex-wrap items-center justify-between py-2'>
				<div className='h-[80px] w-[80px] rounded-full border border-slate-500 relative'>
					<Image
						fill
						alt='image'
						src={vendor?.avatar}
						// src={'/user__1.svg'}
						className='object-fill h-full w-full absolute rounded-full'
					/>
				</div>

				<div className='flex flex-row sm:flex-col space-x-5 sm:space-x-0 sm:space-y-2'>
					<Link href={`/sellers/${vendor?.vendorId!.toLowerCase()}`}>
						<Button
							type='button'
							variant={'outline'}
							onClick={() => {
								updateVendor(vendor);
							}}
							className='bg-main text-white hover:bg-main hover:text-white text-xs h-10 rounded-none py-3 w-full'
						>
							Profile
						</Button>
					</Link>

					<Link href={'#'}>
						<Button
							type='button'
							variant={'outline'}
							onClick={() => {
								const chatLink = `https://wa.me/+234${vendor?.phoneNumber}`;

								window.open(chatLink, '_blank');
							}}
							className='bg-orange-500 text-white text-xs h-10 rounded-none py-3 w-full'
						>
							Chat with Seller
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SellerInfoCard;
