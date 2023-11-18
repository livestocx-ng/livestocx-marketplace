'use client';
import {usePathname} from 'next/navigation';
import {useGlobalStore} from '@/hooks/use-global-store';
import ProductCard from '@/components/cards/product-card';
import MarketPlaceProductCard from '../cards/marketplace-product-card';
import SellerProductCard from '../cards/seller-product-card';

const MoreFromSellerTab = () => {
	const pathName = usePathname();

	console.log(pathName);

	const {productInfo} = useGlobalStore();

	return (
		<div className='flex flex-wrap items-center justify-between w-full gap-y-4 md:gap-6 mt-10'>
			{productInfo?.moreProducts?.slice(0, 10).map((product) => {
				if (!pathName.includes('marketplace')) {
					return <ProductCard key={product.id} product={product} />;
				}
				if (pathName.includes('marketplace')) {
					return <MarketPlaceProductCard key={product.id} product={product} />;
				}
				if (pathName.includes('sellers')) {
					return <SellerProductCard key={product.id} product={product} />;
				}
			})}
		</div>
	);
};

export default MoreFromSellerTab;
