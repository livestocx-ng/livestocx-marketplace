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
			initial={{opacity: 0.8}}
			animate={{opacity: 1}}
			transition={{
				duration: 1.5,
				repeat: Infinity,
				delay: 1.2,
				// repeatDelay: 0.5,
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
			className='absolute top-0 left-0 w-full py-2 bg-gradient-to-tr from-orange-200 to-orange-500 text-sm px-4 flex justify-center space-x-3 cursor-pointer'
		>
			<p className='text-[12px] md:text-sm font-medium text-center'>
				Want to sell very fast? Get your Livestocx online store for{' '}
				{premiumSubscriptionPlans?.length > 0
					? `${
							PriceFormatter(
								premiumSubscriptionPlans[0]?.price
							).split('.00')[0]
					  }/year.`
					: `${PriceFormatter(10050).split('.00')[0]}`}
			</p>
			<Rocket size={20} className='text-white' />
		</motion.div>
	);
};

export default PromotionBanner;
