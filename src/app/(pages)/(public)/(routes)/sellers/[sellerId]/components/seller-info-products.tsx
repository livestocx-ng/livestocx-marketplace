'use client';
import {useGlobalStore} from '@/hooks/use-global-store';
import SellerProductCard from '@/components/cards/seller-product-card';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';


interface SellerInfoProductsProps {
	currentPage: number;
	updateCurrentPage: Dispatch<SetStateAction<number>>;
}

const SellerInfoProducts = ({currentPage, updateCurrentPage}: SellerInfoProductsProps) => {
	const {products, totalPages, hasNextPage} = useGlobalStore();

	return (
		<div className='flex flex-col w-full bg-white '>
			<div className='flex flex-wrap items-center w-full justify-start gap-y-10 gap-x-2 sm:gap-x-5 md:gap-x-10 mt-1'>
				{products?.map((product) => (
					<SellerProductCard key={product.id} product={product} />
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
		</div>
	);
};

export default SellerInfoProducts;
