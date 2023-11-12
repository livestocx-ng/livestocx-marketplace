'use client';
import React from 'react';
import {useEffect} from 'react';
import axios, {AxiosError} from 'axios';
import AuthHeader from '@/components/header/auth-header';
import MarketplaceProducts from './components/marketplace-products';
import MarketplaceFilterForm from './components/marketplace-filterform';
import {useGlobalStore} from '@/hooks/use-global-store';
import { useUserHook } from '@/hooks/use-user';

const MarketPlacePage = () => {
	const userStore = useUserHook()
	const {products, updateProducts, updatePagination} = useGlobalStore();

	const fetchMarketPlaceProducts = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/marketplace/fetch-all`
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
		fetchMarketPlaceProducts();
	}, []);

	return (
		<div className='w-full'>
			<AuthHeader />

			<div className='w-full flex flex-col pb-20'>
				<MarketplaceFilterForm />

				<MarketplaceProducts products={products}/>
			</div>
		</div>
	);
};

export default MarketPlacePage;
