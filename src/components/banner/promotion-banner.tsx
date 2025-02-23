import {Rocket} from 'lucide-react';
import {motion} from 'framer-motion';
import {useRouter} from 'next/navigation';
import {PromotionPlan} from '@/types/types';
import React, {useEffect, useState} from 'react';
import {PriceFormatter} from '@/utils/price.formatter';
import {useGlobalStore} from '@/hooks/use-global-store';

const PromotionBanner = () => {
	const router = useRouter();

	const [plan, setPlan] = useState<PromotionPlan | null>(null);
	const {user, promotionPlans, updateCurrentAccountTab} = useGlobalStore();

	const [countdown, setCountdown] = useState<number>(86400); // 24 hours in seconds
	const [endTime, setEndTime] = useState<Date | null>(null);

	const filterPromotionPlans = () => {
		const plan = promotionPlans?.filter((plan) => plan.position === 1)[0];

		if (plan) {
			setPlan(plan);
		}

		// console.log('[PLAN] :: ', plan);
	};

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
		const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
		const secs = (seconds % 60).toString().padStart(2, '0');
		return `${hours}:${minutes}:${secs}`;
	};	

	useEffect(() => {
		filterPromotionPlans();
	}, [promotionPlans.length]);

	useEffect(() => {
		const savedEndTime = localStorage.getItem('LVSX_PROMOTION_BANNER_END_TIME');
		if (savedEndTime) {
			const endTimeDate = new Date(parseInt(savedEndTime));
			setEndTime(endTimeDate);
			const remainingTime = Math.floor((endTimeDate.getTime() - Date.now()) / 1000);
			if (remainingTime > 0) {
				setCountdown(remainingTime);
			} else {
				restartCountdown();
			}
		} else {
			restartCountdown();
		}
	}, []);

	// Restart countdown function
	const restartCountdown = () => {
		const possibleDurations = [28800, 32400, 36000, 43200, 86400]; // Various durations in seconds
		const randomDuration = possibleDurations[Math.floor(Math.random() * possibleDurations.length)];
		const newEndTime = new Date(Date.now() + randomDuration * 1000);
		setEndTime(newEndTime);
		setCountdown(randomDuration);
		localStorage.setItem('LVSX_PROMOTION_BANNER_END_TIME', newEndTime.getTime().toString());
	};

	// Countdown timer
	useEffect(() => {
		const timer = setInterval(() => {
			if (endTime) {
				const remainingTime = Math.floor((endTime.getTime() - Date.now()) / 1000);
				if (remainingTime <= 0) {
					restartCountdown();
				} else {
					setCountdown(remainingTime);
				}
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [endTime]);

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
				Boost your posted product for{' '}
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
					: `${PriceFormatter(1600).split('.00')[0]} per week`}{' '} <br className='block sm:hidden'/>
					<span className="underline font-semibold">
						Offer ends in {formatTime(countdown)}
					</span>
			</p>
			<Rocket size={20} className='text-white' />
		</motion.div>
	);
};

export default PromotionBanner;
