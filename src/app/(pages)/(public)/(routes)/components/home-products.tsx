'use client';
import {RotateCw} from 'lucide-react';
import {Dispatch, Fragment, SetStateAction, useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';

import {Button} from '@/components/ui/button';
import {useGlobalStore} from '@/hooks/use-global-store';
import ProductCard from '../../../../../components/cards/product-card';
import PaginationButton from '@/components/utils/pagination-button';
import {usePathname} from 'next/navigation';
import AdvertisementBanner from '@/components/banner/advertisement-banner';

interface Tab {
	id: number;
	title: string;
	value: string;
}

interface HomeProductsProps {
	currentPage: number;
	updateCurrentPage: Dispatch<SetStateAction<number>>;
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

const HomeProducts = ({currentPage, updateCurrentPage}: HomeProductsProps) => {
	const pathName = usePathname();
	const {products, totalPages, hasNextPage} = useGlobalStore();

	const [currentTab, setCurrentTab] = useState<Tab>(TabItems[0]);

	return (
		<Fragment>
			<div className='flex item-center space-x-4'>

				{pathName.length <= 1 && (
					<>
						{TabItems.map((tab) => (
							<Button
								key={tab.id}
								type='button'
								className={`border bg-white hover:bg-white rounded-none ${
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
					</>
				)}
			</div>

			<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2 mt-5'>
				{products?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>

			{!hasNextPage && totalPages > 1 && (
				<div className='flex justify-center mt-10'>
					<Button
						type='button'
						variant={'outline'}
						onClick={() => {
							updateCurrentPage(1);
							window.scrollTo({
								top: 50,
								behavior: 'smooth',
							});
						}}
						className='flex items-center space-x-1 bg-white border hover:bg:white focus:bg-white'
					>
						<RotateCw />
						<span>Reset</span>
					</Button>
				</div>
			)}
			{hasNextPage && (
				<div className='flex justify-center mt-10'>
					<Button
						type='button'
						variant={'outline'}
						onClick={() => {
							updateCurrentPage(currentPage + 1);
							window.scrollTo({
								top: 50,
								behavior: 'smooth',
							});
						}}
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
