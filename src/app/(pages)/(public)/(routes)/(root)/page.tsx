'use client';
import axios, {AxiosError} from 'axios';
import SearchForm from '../components/search-form';
import {Fragment, useEffect, useState} from 'react';
import Footer from '@/components/navigation/footer';
import HomeProducts from '../components/home-products';
import {useGlobalStore} from '@/hooks/use-global-store';
import MainNavbar from '@/components/navigation/main-nav-bar';
import TestimonialSection from '@/components/common/testimonials';
import PromotionBanner from '@/components/banner/promotion-banner';
import ProductCardSkeleton from '@/components/skeletons/product-card-skeleton';
import {Button} from '@/components/ui/button';
import {ExternalLink} from 'lucide-react';
import {motion} from 'framer-motion';

export default function HomePage() {
	const {products, updateProducts, updatePagination, updateSearchLocation} =
		useGlobalStore();

	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const fetchProducts = async () => {
		try {
			setLoading(false);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/recommended/fetch-all?page=${currentPage}`
			);

			updateProducts([]);
			updateProducts(data.data.products);
			updatePagination(data.data.totalPages, data.data.hasNext);

			setLoading(false);
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		updateSearchLocation('Nigeria', 'Nigeria');
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [currentPage]);

	return (
		<Fragment>
			<MainNavbar />
			<main className='bg-[#28312B]'>
				<section className='h-[28vh h-[38vh] md:h-[400px] w-full bg-white md:bg-gradient-to-b md:from-green-800 md:to-green-50 flex flex-col items-center md:items-center justify-end gap-y-3 md:gap-y-10 py-2 md:py-10 md:pb-2'>
					<h1 className='text-lg md:text-4xl font-medium text-black md:text-white text-center'>
						Best{' '}
						<span className='text-green-600 md:text-white'>
							deals.
						</span>{' '}
						Everything{' '}
						<span className='text-green-600 md:text-white'>
							Animals
						</span>
					</h1>
					<div className='w-full flex items-center justify-center md:justify-start md:items-start px-4 md:px-8'>
						<Button
							type='button'
							onClick={() => {
								window.open(
									'https://climateresilience.livestocx.com',
									'_blank'
								);
							}}
							className='bg-green-600 text-white h- hover:bg-green-700 w-fit rounded-full py-2 flex-col animate-pulse duration-[2000] delay-[2000] ease-in-out'
						>
							<span className='flex items-center gap-x-2 text-g'>
								Climate Resilience AI™
								<ExternalLink className='w-4 h-4' />
							</span>
							<p className='text-sm underline'>Learn More</p>
						</Button>
					</div>
					<SearchForm />
				</section>

				{!loading && products?.length === 0 && (
					<div className='flex flex-col w-full bg-white px-4 md:px-8 sm:pt-6 pb-10 relative'>
						<PromotionBanner />

						<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2 pt-5 sm:pt-0 mt-16 md:mt-10'>
							{Array(50)
								.fill(1)
								.map((item, index) => (
									<ProductCardSkeleton key={index} />
								))}
						</div>
					</div>
				)}

				{!loading && products?.length > 0 && (
					<div className='flex flex-col w-full bg-white px-4 md:px-8 pt-10 sm:pt-10 pb-10 relative'>
						<PromotionBanner />

						<HomeProducts
							currentPage={currentPage}
							updateCurrentPage={setCurrentPage}
						/>
					</div>
				)}

				<TestimonialSection />
			</main>
			<Footer />
		</Fragment>
	);
}
