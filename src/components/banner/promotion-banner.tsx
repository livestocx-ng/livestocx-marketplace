import {Rocket} from 'lucide-react';
import {motion} from 'framer-motion';
import {useRouter} from 'next/navigation';
import {PromotionPlan} from '@/types/types';
import React, {useEffect, useState} from 'react';
import {PriceFormatter} from '@/utils/price.formatter';
import {useGlobalStore} from '@/hooks/use-global-store';

const PromotionBanner = () => {
	const router = useRouter();

	const {user, promotionPlans, updateCurrentAccountTab} = useGlobalStore();

	const [plan, setPlan] = useState<PromotionPlan | null>(null);

	const filterPromotionPlans = () => {
		const plan = promotionPlans?.filter((plan) => plan.position === 1)[0];

		if (plan) {
			setPlan(plan);
		}

		// console.log('[PLAN] :: ', plan);
	};

	useEffect(() => {
		filterPromotionPlans();
	}, [promotionPlans.length]);

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
					if (!user) {
						return router.replace('/signin');
					}

					updateCurrentAccountTab('Promotions');

					router.replace('/account');
				} catch (error) {
					// console.log(_error);
				}
			}}
			className='absolute top-0 left-0 w-full py-2 bg-gradient-to-tr from-orange-200 to-orange-500 text-sm px-4 flex justify-center space-x-3 cursor-pointer'
		>
			<p className='text-[12px] md:text-sm font-medium text-center'>
				Boost your posted product with just for{' '}
				{promotionPlans?.length > 0
					? `${
							plan
								? PriceFormatter(plan?.discount_price).split(
										'.00'
								  )[0]
								: PriceFormatter(
										promotionPlans[0]?.price
								  ).split('.00')[0]
					  } per week.`
					: `${PriceFormatter(1600).split('.00')[0]} per week`}
			</p>
			<Rocket size={20} className='text-white' />
		</motion.div>
	);
};

export default PromotionBanner;
