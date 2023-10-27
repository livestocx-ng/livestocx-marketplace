import React from 'react';
import AuthHeader from '@/components/header/auth-header';
import MarketplaceFilterForm from '../components/marketplace-filterform';
import MarketplaceProducts from '../components/marketplace-products';

interface MarketPlaceFilterPageProps {
	params: {
		filter: string;
	};
}

const MarketPlaceFilterPage = ({params}: MarketPlaceFilterPageProps) => {
	console.log('[PARAMS] :: ', params);

	return (
		<div className='w-full'>
			<AuthHeader />

			<div className='w-full flex flex-col pb-20'>
				<h1 className='px-4 pt-5 text-lg'>
					You searched for "
					<span className='text-main capitalize'>
						{params.filter}
					</span>
					"
				</h1>

				<MarketplaceFilterForm />

				<MarketplaceProducts />
			</div>
		</div>
	);
};

export default MarketPlaceFilterPage;
