'use client';
import {RotateCw} from 'lucide-react';
import {Fragment, useState} from 'react';

import {Button} from '@/components/ui/button';
import ProductCard from '@/components/cards/product-card';

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

const MarketplaceProducts = () => {
	return (
		<div className='flex flex-col w-full bg-white px-4 md:px-8'>
			<div className='flex flex-wrap items-center gap-y-10 gap-x-2 sm:gap-x-5 md:gap-x-10 mt-10'>
				{[
					1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 5, 6, 7, 8,
					9, 10,
				].map((item) => (
					<ProductCard key={item} />
				))}
			</div>
		</div>
	);
};

export default MarketplaceProducts;
