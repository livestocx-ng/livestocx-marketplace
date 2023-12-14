'use client';
import {useGlobalStore} from '@/hooks/use-global-store';
import ProductCard from '@/components/cards/product-card';


const SellerInfoProducts = () => {
	const {products} = useGlobalStore();

	return (
		<div className='flex flex-col w-full bg-white '>
			<div className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2 mt-5'>
				{products?.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default SellerInfoProducts;
