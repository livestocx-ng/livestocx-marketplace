import {Product} from '@/types/types';
import MarketPlaceProductCard from '@/components/cards/marketplace-product-card';

const MarketplaceProducts = ({products}: {products: Product[]}) => {
	return (
		<div className='flex flex-col w-full bg-white px-4 md:px-8'>
			<div className='flex flex-wrap items-center w-full justify-start gap-y-10 gap-x-2 sm:gap-x-5 md:gap-x-10 mt-10'>
				{products?.map((product) => (
					<MarketPlaceProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default MarketplaceProducts;
