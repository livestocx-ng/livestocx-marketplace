import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const SellerBanner = () => {
	return (
		<div className='w-[100%] flex flex-col sm:flex-row items-start justify-between border border-gray-400 rounded-md'>
			<div className='border- w-ful sm:w-[20%]'>
				<Image
					alt='logo'
					width={160}
					height={160}
					className='w-full'
					src={'/farmer__logo__1.svg'}
				/>
			</div>

			<div className='flex flex-col  space-y-5 w-[80%] px-10 border-t sm:border-l border-l-gray-400 py-6'>
				<h1 className='text-center text-xl font-semibold'>
					Jigga Farms
				</h1>

				<div className='flex flex-col space-y-2'>
					<p>
						Location:{' '}
						<span className='text-orange-500'>
							Unguwa uku yanawaki kano, KANO STATE, Kano, Nigeria
						</span>
					</p>
					<p>
						Contact:{' '}
						<span className='text-orange-500'>09039992991</span>
					</p>

					<div className='w-full flex justify-end'>
						<Button
							type='button'
							variant={'outline'}
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
