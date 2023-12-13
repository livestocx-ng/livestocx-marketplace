'use client';
import React, {useState} from 'react';
import {useEffect} from 'react';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import {useUserHook} from '@/hooks/use-user';
import {useGlobalStore} from '@/hooks/use-global-store';
import AuthHeader from '@/components/header/auth-header';
import MarketplaceProducts from './components/marketplace-products';
import MarketplaceFilterForm from './components/marketplace-filterform';
import EmptyAnimation from '../../../../../../public/animations/animation__3.json';
import LoadingAnimation from '../../../../../../public/animations/loading__animation__1.json';
import { title } from 'process';
import { Value } from '@radix-ui/react-select';

const MarketPlacePage = () => {
	const userStore = useUserHook();
	const {products, updateProducts, updatePagination} = useGlobalStore();
	const [currentPage, setCurrentPage] = useState<number>(1)

	const [loading, setLoading] = useState(true);

	const fetchMarketPlaceProducts = async () => {
		try {
			setLoading(true);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/marketplace/fetch-all?page=${currentPage}`
			);

			console.log('[DATA] ::  ', data);

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
		fetchMarketPlaceProducts();
	}, [currentPage]);

	return (
		<div className='w-full'>
			<AuthHeader />

			<div className='w-full flex flex-col pb-20'>
				<MarketplaceFilterForm />

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

			{!loading && products?.length === 0 && (
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

			{!loading && products?.length > 0 && (
				<div className='flex flex-col w-full bg-white px-4 md:px-8 py-10'>
					<MarketplaceProducts currentPage={currentPage} updateCurrentPage={setCurrentPage}/>
				</div>
			)}

				{/* {!loading && products?.length > 0 && (
					<MarketplaceProducts currentPage={currentPage} updateCurrentPage={setCurrentPage} />
				)} */}
			</div>
		</div>
	);
};

export default MarketPlacePage;
