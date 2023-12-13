import {Product} from '@/types/types';
import MarketPlaceProductCard from '@/components/cards/marketplace-product-card';
import { useGlobalStore } from '@/hooks/use-global-store';
import { Button } from '@/components/ui/button';
import { RotateCw } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface MarketplaceProductsProps {
	//products: Product[];
	// id: number;
	// title: string;
	// value: string;
	currentPage: number;
	updateCurrentPage: Dispatch<SetStateAction<number>>;
}

const MarketplaceProducts = ({currentPage, updateCurrentPage}: MarketplaceProductsProps) => {
	const {products, totalPages, hasNextPage} = useGlobalStore();
	
	return (
		<div className='flex flex-col w-full bg-white px-4 md:px-8'>
			<div className='flex flex-wrap items-center w-full justify-start gap-y-10 gap-x-2 sm:gap-x-5 md:gap-x-10 mt-10'>
				{products?.map((product) => (
					<MarketPlaceProductCard
						key={product.id}
						product={product}
					/>
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

export default MarketplaceProducts;
