'use client';
import {useGlobalStore} from '@/hooks/use-global-store';
import SellerProductCard from '@/components/cards/seller-product-card';


const SellerInfoProducts = () => {
	const {products} = useGlobalStore();

	return (
		<div className='flex flex-col w-full bg-white '>
			<div className='flex flex-wrap items-center w-full justify-start gap-y-10 gap-x-2 sm:gap-x-5 md:gap-x-10 mt-1'>
				{products?.map((product) => (
					<SellerProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};

export default SellerInfoProducts;
