'use client';
import {useGlobalStore} from '@/hooks/use-global-store';
import ProductCard from '@/components/cards/product-card';

const MoreFromSellerTab = () => {
	const {productInfo} = useGlobalStore();

	return (
		<div className='flex flex-wrap items-center justify-between w-full gap-y-4 md:gap-6 mt-10'>
			{productInfo?.moreProducts?.slice(0, 10).map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};

export default MoreFromSellerTab;
