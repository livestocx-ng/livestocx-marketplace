import {Product} from '@/types/types';
import ProductCard from '@/components/cards/product-card';

interface MarketplaceProductsProps {
	products: Product[];
}

const MarketplaceProducts = ({products}: MarketplaceProductsProps) => {
	return (
		<div className='flex flex-col w-full bg-white px-4'>
			<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2 mt-5'>
				{products?.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
					/>
				))}
			</div>
		</div>
	);
};

export default MarketplaceProducts;
