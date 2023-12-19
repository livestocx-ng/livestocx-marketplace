'use client';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useUserHook} from '@/hooks/use-user';
import SearchForm from './components/search-form';
import HomeProducts from './components/home-products';
import {useGlobalStore} from '@/hooks/use-global-store';
import TestimonialSection from '@/components/common/testimonials';
import EmptyAnimation from '../../../../../public/animations/animation__3.json';
import LoadingAnimation from '../../../../../public/animations/loading__animation__1.json';

export default function HomePage() {
	const router = useRouter();
	const userStore = useUserHook();
	const {user, products, updateProducts, updatePagination} = useGlobalStore();

	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const fetchProducts = async () => {
		try {
			setLoading(false);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/recommended/fetch-all?page=${currentPage}`
			);

			// console.log('[DATA] ::  ', data);

			updateProducts(data.data.products);
			updatePagination(data.data.totalPages, data.data.hasNext);

			setLoading(false);
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, [currentPage]);

	return (
		<main className='bg-[#28312B]'>
			<section className='h-[35vh] md:h-[50vh] w-full bg-home flex flex-col items-center justify-end gap-y-10 md:gap-y-16 py-5 md:py-10 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					Best <span className='text-green-600'>deals.</span>{' '}
					Everything <span className='text-green-600'>Livestocx</span>
				</h1>

				<SearchForm />

				{/* <div className='md:px-8 pb-10 w-full'>
					<CarouselSlide />
				</div> */}
			</section>

			{/* {loading && (
				<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
					<div className='h-[200px] w-1/2 mx-auto bg-white'>
						<Lottie
							loop={true}
							className='h-full'
							animationData={LoadingAnimation}
						/>
					</div>
				</div>
			)} */}

			{!loading && products?.length === 0 && (
				<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
					<div className='h-[200px] w-1/2 mx-auto bg-white'>
						<Lottie
							loop={false}
							className='h-full'
							animationData={EmptyAnimation}
						/>
					</div>
				</div>
			)}

			{!loading && products?.length > 0 && (
				<div className='flex flex-col w-full bg-white px-4 md:px-8 pt-5 pb-10'>
					<HomeProducts
						currentPage={currentPage}
						updateCurrentPage={setCurrentPage}
					/>
				</div>
			)}

			<TestimonialSection />
		</main>
	);
}
