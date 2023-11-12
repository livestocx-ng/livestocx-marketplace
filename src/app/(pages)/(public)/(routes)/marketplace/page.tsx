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

const MarketPlacePage = () => {
	const userStore = useUserHook();
	const {products, updateProducts, updatePagination} = useGlobalStore();

	const [loading, setLoading] = useState(true);

	const fetchMarketPlaceProducts = async () => {
		try {
			setLoading(true);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/marketplace/fetch-all`
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
	}, []);

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
					<MarketplaceProducts products={products} />
				)}
			</div>
		</div>
	);
};

export default MarketPlacePage;
