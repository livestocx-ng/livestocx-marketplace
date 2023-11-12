'use client';
import Lottie from 'lottie-react';
import React, {useEffect} from 'react';
import axios, {AxiosError} from 'axios';
import {useGlobalStore} from '@/hooks/use-global-store';
import AuthHeader from '@/components/header/auth-header';
import MarketplaceProducts from '../components/marketplace-products';
import MarketplaceFilterForm from '../components/marketplace-filterform';
import Animation1 from '../../../../../../../public/animations/animation__2.json';

interface MarketPlaceFilterPageProps {
	params: {
		category: string;
	};
}

const MarketPlaceFilterPage = ({params}: MarketPlaceFilterPageProps) => {
	console.log('[PARAMS] :: ', params);
	const {products, updateProducts, updatePagination} = useGlobalStore();

	const fetchMarketPlaceFilteredProducts = async () => {
		try {
			const {data} = await axios.get(
				`${
					process.env.NEXT_PUBLIC_API_URL
				}/user/products/marketplace/fetch-all?category=${params.category.toUpperCase()}`
			);

			console.log('[DATA] ::  ', data);

			updateProducts(data.data.products);
			updatePagination(data.data.totalPages, data.data.hasNext);
		} catch (error) {
			const _error = error as AxiosError;

			console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchMarketPlaceFilteredProducts();
	}, []);

	return (
		<div className='w-full'>
			<AuthHeader />

			<div className='w-full flex flex-col pb-20'>
				<h1 className='px-4 pt-5 text-lg'>
					You searched for "
					<span className='text-main capitalize'>
						{params.category}
					</span>
					"
				</h1>

				<MarketplaceFilterForm />

				{products && products?.length === 0 && (
					<div className='h-[400px] w-1/2 mx-auto'>
							<Lottie
								loop={true}
								className='h-full'
								animationData={Animation1}
								// animationData={'/animations/animation__1.json'}
								// animationData={'/animations/loading__animation.json'}
							/>
					</div>
				)}

				{products && products?.length > 0 && (
					<MarketplaceProducts products={products} />
				)}
			</div>
		</div>
	);
};

export default MarketPlaceFilterPage;
