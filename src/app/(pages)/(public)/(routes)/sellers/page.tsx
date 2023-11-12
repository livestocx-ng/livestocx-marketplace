'use client';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import React, {useEffect, useState} from 'react';
import SearchForm from '../components/search-form';
import HomeSellers from './components/home-sellers';
import {useGlobalStore} from '@/hooks/use-global-store';
import EmptyAnimation from '../../../../../../public/animations/animation__3.json';
import LoadingAnimation from '../../../../../../public/animations/loading__animation__1.json';

const SellersPage = () => {
	const userStore = useUserHook();

	const {vendors, updateVendors, updatePagination} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(true);

	const fetchSellers = async () => {
		try {
			setLoading(true);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/fetch-all`
			);

			console.log('[DATA] ::  ', data);

			updateVendors(data.data.vendors);
			updatePagination(data.data.totalPages, data.data.hasNext);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;

			console.log('[FETCH-SELLERS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchSellers();
	}, []);

	return (
		<main className='bg-[#28312B]'>
			<section className='md:h-[60vh] w-full bg-home flex flex-col items-center justify-center gap-y-16 pt-28 md:pt-0 pb-20 mb:pb-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					Best <span className='text-green-600'>deals.</span>{' '}
					Everything <span className='text-green-600'>Livestocx</span>
				</h1>

				<SearchForm />
			</section>

			{loading && (
				<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
					<div className='h-[200px] w-1/2 mx-auto bg-white'>
						<Lottie
							loop={true}
							className='h-full'
							animationData={LoadingAnimation}
						/>
					</div>
				</div>
			)}

			{!loading && vendors?.length === 0 && (
				<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
					<div className='h-[200px] w-1/2 mx-auto bg-white'>
						<Lottie
							loop={true}
							className='h-full'
							animationData={EmptyAnimation}
						/>
					</div>
				</div>
			)}

			{!loading && vendors?.length > 0 && (
				<div className='flex flex-col w-full bg-white px-4 md:px-8 py-10'>
					<HomeSellers />
				</div>
			)}
		</main>
	);
};

export default SellersPage;
