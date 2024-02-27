'use client';
import React from 'react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {useGlobalStore} from '@/hooks/use-global-store';

const SellerBanner = () => {
	const {vendor} = useGlobalStore();

	return (
		<div className='w-[100%] md:h-[220px] flex flex-col sm:flex-row items-start justify-between border border-gray-400'>
			<div className='w-full h-full sm:w-[20%] relative flex flex-col items-center justify-center'>
				<Image
					alt='logo'
					fill
					// width={160}
					// height={160}
					// src={'/vendor.jpg'}
					src={vendor?.avatar!}
					unoptimized={true}
					className='h-full w-full object-cover'
				/>
			</div>

			<div className='flex flex-col h-full space-y-5 md:w-[80%] px-4 md:px-10 border-t sm:border-l border-l-gray-400 py-6'>
				<h1 className='text-center text-xl font-semibold uppercase'>
					{vendor?.name}
				</h1>

				<div className='flex flex-col space-y-'>
					<p>
						Location:{' '}
						<span className='text-orange-500'>
							{vendor?.address}, {vendor?.state} State, Nigeria
						</span>
					</p>
					<p>
						Email:{' '}
						<span className='text-orange-500'>{vendor?.email}</span>
					</p>
					<p>
						Contact:{' '}
						<span className='text-orange-500'>
							{vendor?.phoneNumber}
						</span>
					</p>

					<div className='w-full flex justify-end'>
						<Button
							type='button'
							variant={'outline'}
							onClick={() => {
								const chatLink = `https://wa.me/+234${vendor?.phoneNumber}`;

								window.open(chatLink, '_blank');
							}}
							className='border border-main text-xs h-12 rounded-md py-3 w-fit'
						>
							Chat with Seller
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerBanner;
