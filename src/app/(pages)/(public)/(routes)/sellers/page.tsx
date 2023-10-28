import React from 'react';
import SearchForm from '../components/search-form';
import HomeSellers from './components/home-sellers';

const SellersPage = () => {
	return (
		<main className='bg-[#28312B]'>
			<section className='md:h-[60vh] w-full bg-home flex flex-col items-center justify-center gap-y-16 pt-28 md:pt-0 pb-20 mb:pb-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					Best <span className='text-green-600'>deals.</span>{' '}
					Everything <span className='text-green-600'>Livestocx</span>
				</h1>

				<SearchForm />
			</section>

            <div className='flex flex-col w-full bg-white px-4 md:px-8 py-10'>
				<HomeSellers />
			</div>
		</main>
	);
};

export default SellersPage;
