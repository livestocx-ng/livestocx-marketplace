'use client';
import {RotateCw} from 'lucide-react';
import {Fragment, useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';

import {Button} from '@/components/ui/button';
import {useUserHook} from '@/hooks/use-user';
import {useGlobalStore} from '@/hooks/use-global-store';
import ProductCard from '../../../../../components/cards/product-card';

interface Tab {
	id: number;
	title: string;
	value: string;
}

const TabItems: Tab[] = [
	{
		id: 1,
		title: 'Recommended',
		value: 'recommended',
	},
	{
		id: 2,
		title: 'Popular',
		value: 'popular',
	},
];

const HomeProducts = () => {
	const {
		products,
		totalPages,
		hasNextPage,
		updateProducts,
		updatePagination,
	} = useGlobalStore();

	const [currentTab, setCurrentTab] = useState<Tab>(TabItems[0]);

	const fetchProducts = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/recommended/fetch-all`
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
		fetchProducts();
	}, []);

	return (
		<Fragment>
			<div className='flex item-center space-x-4'>
				{TabItems.map((tab) => (
					<Button
						key={tab.id}
						type='button'
						className={`border  bg-white hover:bg-white ${
							currentTab.id === tab.id
								? 'border-main text-main'
								: 'border-black text-black'
						}`}
						onClick={() => {
							const index = TabItems.findIndex(
								(item) => item.id === tab.id
							);

							setCurrentTab(TabItems[index]);
						}}
					>
						{tab.title}
					</Button>
				))}
			</div>

			{/* <div className='flex justify-between items-center flex-wrap gap-6 mt-10'> */}
			<div className='flex flex-wrap items-center w-full justify-around gap-y-10 gap-x-2 sm:gap-x-5 md:gap-x-10 mt-10'>
				{products?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			{hasNextPage && (
				<div className='flex justify-center mt-10'>
					<Button
						type='button'
						variant={'outline'}
						className='flex items-center space-x-1 bg-white border hover:bg:white focus:bg-white'
					>
						<RotateCw />
						<span>Load More</span>
					</Button>
				</div>
			)}
		</Fragment>
	);
};

export default HomeProducts;
