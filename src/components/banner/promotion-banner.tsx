import React from 'react';
import {Rocket} from 'lucide-react';
import {motion} from 'framer-motion';
import {useRouter} from 'next/navigation';
import {PriceFormatter} from '@/utils/price.formatter';
import {useGlobalStore} from '@/hooks/use-global-store';

const PromotionBanner = () => {
	const router = useRouter();

	const {premiumSubscriptionPlans} = useGlobalStore();

	return (
		<motion.div
			initial={{opacity: 0.6}}
			animate={{opacity: 1}}
			transition={{
				duration: 2.5,
				repeat: Infinity,
				// delay: 1.5,
				repeatDelay: 2.5,
			}}
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
			<p className='text-[10px] md:text-sm font-medium flex space-x-2'>
				{/* Want to sell very fast? Boost your product with just &#8358;810
				per week */}
				Want to sell very fast? Get an online store for{' '}
				{premiumSubscriptionPlans?.length > 0
					? `${
							PriceFormatter(
								premiumSubscriptionPlans[0]?.price
							).split('.00')[0]
					  }/year`
					: ''}
				.
			</p>

			<Rocket size={20} className='text-white animate-puls' />
		</motion.div>
	);
};

export default PromotionBanner;
