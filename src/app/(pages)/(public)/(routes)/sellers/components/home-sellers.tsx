'use client';
import React, {Dispatch, Fragment, SetStateAction} from 'react';
import {RotateCw} from 'lucide-react';
import {Button} from '@/components/ui/button';
import SellerInfoCard from './seller-info-card';
import {useGlobalStore} from '@/hooks/use-global-store';

interface HomeSellerProps {
	currentPage: number;
	updateCurrentPage: Dispatch<SetStateAction<number>>;
}

const HomeSellers = ({currentPage, updateCurrentPage}:HomeSellerProps) => {
	const {hasNextPage, totalPages,vendors} = useGlobalStore();

	return (
		<Fragment>
			<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2 mt-5'>
				{vendors?.map((vendor) => (
					<SellerInfoCard key={vendor.id} vendor={vendor} />
				))}
			</div>

			{!hasNextPage && totalPages > 1 && (
				<div className='flex justify-center mt-10'>
					<Button
						type='button'
						variant={'outline'}
						onClick={() => {
							updateCurrentPage(1);
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

export default HomeSellers;
