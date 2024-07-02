import React from 'react';
import {Rocket} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {PriceFormatter} from '@/utils/price.formatter';
import {useGlobalStore} from '@/hooks/use-global-store';

const PromotionBanner = () => {
	const router = useRouter();

	const {user, updateCurrentAccountTab, premiumSubscriptionPlans} =
		useGlobalStore();

	return (
		<div
			onClick={async () => {
				try {
					// if (user == null) {
					// 	return router.push('/signin');
					// }

					router.push('/business');

					// updateCurrentAccountTab('Promotions');
				} catch (error) {
					// console.log(_error);
				}
			}}
			className='absolute top-0 left-0 w-full py-2 bg-gradient-to-tr from-indigo-200 to-indigo-500 text-sm px-4 flex items-center justify-center space-x-3 cursor-pointer'
		>
			<p className='text-xs md:text-sm font-medium'>
				{/* Want to sell very fast? Boost your product with just &#8358;810
				per week */}
				Boost your business! Create your mini-website/online store with
				Livestocx for{' '}
				{premiumSubscriptionPlans?.length > 0
					? `${
							PriceFormatter(
								premiumSubscriptionPlans[0]?.price
							).split('.00')[0]
					  }/year`
					: ''}
				.
			</p>

			<Rocket size={20} className='text-white animate-pulse' />
		</div>
	);
};

export default PromotionBanner;
