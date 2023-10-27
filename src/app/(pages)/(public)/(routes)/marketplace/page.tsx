import React from 'react';
import AuthHeader from '@/components/header/auth-header';
import MarketplaceProducts from './components/marketplace-products';
import MarketplaceFilterForm from './components/marketplace-filterform';

const MarketPlacePage = () => {
	return (
		<div className='w-full'>
			<AuthHeader />

			<div className='w-full flex flex-col pb-20'>
				<MarketplaceFilterForm />

				<MarketplaceProducts />
			</div>
		</div>
	);
};

export default MarketPlacePage;
