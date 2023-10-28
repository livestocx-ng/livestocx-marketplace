'use client'
import React, {Fragment} from 'react';
import {RotateCw} from 'lucide-react';
import {Button} from '@/components/ui/button';
import SellerInfoCard from './seller-info-card';

const HomeSellers = () => {
	return (
		<Fragment>
			<div className='flex flex-wrap items-center justify-evenly w-full gap-y-10 md:gap-6 mt-10'>
				{[1, 2, 3, 4, 5, 12, 6, 7, 8, 9].map((item) => (
					<SellerInfoCard key={item} />
				))}
			</div>

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
		</Fragment>
	);
};

export default HomeSellers;
