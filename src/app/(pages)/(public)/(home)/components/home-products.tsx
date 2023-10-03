'use client';
import {Fragment, useState} from 'react';
import {Button} from '@/components/ui/button';
import ProductCard from './product-card';

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
	const [currentTab, setCurrentTab] = useState<Tab>(TabItems[0]);

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
			<div className='grid grid-cols-4 gap-6 mt-10'>
				{[
					1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 5, 6, 7, 8,
					9, 10,
				].map((item) => (
					<ProductCard key={item} />
				))}
			</div>
		</Fragment>
	);
};

export default HomeProducts;
