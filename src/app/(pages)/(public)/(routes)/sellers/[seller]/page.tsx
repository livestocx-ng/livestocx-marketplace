import React from 'react';
import SearchForm from '../../components/search-form';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import SellerBanner from './components/seller-banner';
import SellerInfoSearchForm from './components/seller-search-form';
import PageBanner from '@/components/banner/page-banner';
import SellerInfoProducts from './components/seller-info-products';

interface SellerInfoPageProps {
	params: {
		seller: string;
	};
}

const SellerInfoPage = ({params}: SellerInfoPageProps) => {
	console.log('[PARAMS] :: ', params);

	return (
		<main className='bg-[#28312B]'>
			<section className='sm:h-[60vh] w-full bg-home flex flex-col items-center justify-center gap-y-16 pt-28 pb-20 sm:pb-0 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					Best <span className='text-green-600'>deals.</span>{' '}
					Everything <span className='text-green-600'>Livestocx</span>
				</h1>

				<SearchForm />
			</section>

			<div className='flex flex-col w-full bg-white px-4 md:px-8 py-10 space-y-8'>
				<SellerBanner />

				<PageBanner text='Products of Jigga Farms' />

				<div className='flex items-center justify-between'>
					<SellerInfoSearchForm />
				</div>

				<PageBanner text='0 Products Found' />

				{/* <div className='flex flex-col items-center justify-center py-20'>
					<Image
						alt='logo'
						width={150}
						height={150}
						src={'/logo.svg'}
						className='opacity-50'
					/>

					<p className='mt-2 italic'>No Results Found</p>
				</div> */}

				<SellerInfoProducts />
			</div>
		</main>
	);
};

export default SellerInfoPage;
