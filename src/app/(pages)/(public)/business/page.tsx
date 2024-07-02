'use client';
import Image from 'next/image';
import {
	useGlobalStore,
	useUpgradeToPremiumAccessStore,
	usePremiumSubscriptionCheckoutModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import {useRef, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {PaystackButton} from 'react-paystack';
import {enterprisePlanComparisons} from '@/data';
import {DataTable} from '@/components/ui/data-table';
import {PriceFormatter} from '@/utils/price.formatter';
import ButtonLoader from '@/components/loader/button-loader';
import {premiumSubscriptionPlanDurationFormatter} from '@/utils';
import {generateRandomPaymentReference} from '@/utils/promotion.util.formatter';
import {EnterprisePlansComparisonsColumns} from './components/pricing-columns';
import {BadgeCheck, Circle, Laptop, Award, PieChart} from 'lucide-react';

const PricingPage = () => {
	const router = useRouter();

	const {
		user,
		userPremiumSubscription,
		premiumSubscriptionPlans,
		updateUserPremiumSubscription,
		updatePremiumSubscriptionPlanInfo,
	} = useGlobalStore();

	const premiumSubscriptionCheckoutModal =
		usePremiumSubscriptionCheckoutModalStore();

	const {onClose} = useUpgradeToPremiumAccessStore();
	const subscriptionPlansRef = useRef<HTMLDivElement>(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [currentPlan, setCurrentPlan] = useState<{
		id: number;
		amount: number;
		buttonTitle: string;
	}>({id: 0, amount: 0, buttonTitle: ''});

	const handleSuccess = async (response: any) => {
		try {
			setLoading(true);
			// console.log(response);

			const {data} = await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/vendor/create-premium-subscription?plan=${currentPlan.id}`,
				{
					payment_gateway: 'PAYSTACK',
					payment_date: new Date(),
					payment_reference: response.reference,
					payment_method: 'WEB',
				},
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			setLoading(false);

			setCurrentPlan({id: 0, amount: 0, buttonTitle: ''});

			updateUserPremiumSubscription(data.data);

			onClose();

			toast.success(`Success!`, {duration: 3500});
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[PROMOTION-PAYMENT-ERROR]', _error);

			toast.error('An error occurred.');
		}
	};

	const handleClose = () => {
		toast.error('Payment cancelled!');
	};

	const payStackButtonProps = {
		reference: generateRandomPaymentReference(),
		email: user?.email!,
		metadata: {
			custom_fields: [
				{
					display_name: 'payment_type',
					variable_name: 'payment_type',
					value: 'PREMIUM_SUBSCRIPTION',
				},
				{
					display_name: 'premium_subscription_plan',
					variable_name: 'premium_subscription_plan',
					value: currentPlan.id,
				},
			],
		},
		amount: currentPlan.amount * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
		text: currentPlan.buttonTitle,
		onSuccess: (response: any) => handleSuccess(response),
		onClose: handleClose,
	};

	return (
		<main>
			<section className='w-full bg-gradient-to-b from-green-800 to-white flex flex-col md:flex-row items-center justify-between px-4 md:px-8 pt-20'>
				<div className='flex flex-col space-y-4 w-full md:w-[45%]'>
					<h1 className='text-xl md:text-5xl text-white font-semibold text-center md:text-left'>
						Livestocx for Businesses
					</h1>

					<p className='text-sm md:text-lg text-white font-medium text-center md:text-left leading-8'>
						Expand your business reach. Sell to thousands on our
						Marketplace and showcase your products with our custom
						website and catalog built for you.
					</p>

					<Button
						type='button'
						onClick={() => {
							if (subscriptionPlansRef.current) {
								subscriptionPlansRef.current.scrollIntoView({
									behavior: 'smooth',
								});
							}
						}}
						className='bg-sky-600 text-white hover:bg-sky-700 w-fit rounded-none py-8 px-4 md:px-8 mx-auto md:mx-0'
					>
						Get Started
					</Button>
				</div>

				<div className='h-[250px] w-full md:w-[50%] md:h-[400px] relative bg-orange-20 mt-5 md:mt-0'>
					<Image
						alt=''
						fill
						className='object-fill md:object-cover rounded-sm'
						src={'/enterprise/image__header__1.png'}
					/>
				</div>
			</section>

			<div className='space-y-10 my-14'>
				<h1 className='text-lg md:text-5xl font-semibold text-center'>
					What you get
				</h1>
				<div className='flex flex-wrap items-start justify-between w-full px-4 md:px-8'>
					<div className='h-[400px] w-full md:w-[45%] relative bg-orange-200 mb-10 md:mb-0'>
						<Image
							alt=''
							fill
							className='object-contai object-fill rounded-md'
							src={'/animals/image__chicken__2.jpg'}
						/>
					</div>
					<ul className='w-full md:w-[50%] space-y-3 list-none'>
						<li className='text-sm md:text-lg flex items-center space-x-2'>
							<BadgeCheck size={16} className='text-green-600' />{' '}
							<p>Become verified</p>{' '}
						</li>
						<li className='text-sm md:text-lg flex items-center space-x-2'>
							<Laptop size={16} className='text-green-600' />
							<p>
								⁠Have a mini-website/online store for your
								business that you can share with your customers.
							</p>
						</li>
						<li className='text-sm md:text-lg flex items-center space-x-2'>
							<Award size={16} className='text-green-600' />
							<p> Get one free monthly product promotion</p>
						</li>
						<li className='text-sm md:text-lg flex items-center space-x-2'>
							<PieChart size={16} className='text-green-600' />
							<p>⁠Have access to analytics and sales features.</p>
						</li>
					</ul>
				</div>
			</div>

			<div className='w-full px-4 md:px-[160px] mb-20 flex flex-col space-y-5'>
				<h1 className='font-medium text-lg md:text-4xl text-center'>
					Comparing Livestocx to owning a regular website/store
				</h1>
				<DataTable
					hasPagination={false}
					borderRadius='rounded-b'
					data={enterprisePlanComparisons}
					columns={EnterprisePlansComparisonsColumns}
				/>
			</div>

			<div
				ref={subscriptionPlansRef}
				className='flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-start justify-center lg:justify-evenly gap-y-10 w-full py-5 px-4 md:px-8 lg:px-0 mb-10'
			>
				{premiumSubscriptionPlans?.map((plan, index) => (
					<div
						key={plan.id}
						className={`flex flex-col items-center space-y-5 border rounded-md py-12 px-6 w-full md:w-[400px] hover:scale-105 transition-all duration-700 border-slate-300 shadow-xl shadow-slate-300
							${plan.duration === 'SIX_MONTHS' && 'md:scale-110 hover:scale-110'}`}
					>
						<h1 className='text-xl font-medium'>{plan.title}</h1>
						{/* <h1 className='text-lg'>{plan.description}</h1> */}
						<h1 className='text-lg font-semibold'>
							{PriceFormatter(plan.price)} /{' '}
							{premiumSubscriptionPlanDurationFormatter(
								plan.duration
							)}
						</h1>

						{loading && currentPlan.id === plan.id ? (
							<Button
								type='button'
								disabled={true}
								className={`text-white h-10 w-fit rounded-full py-3 text-xs ${
									plan.duration === 'ONE_MONTH'
										? 'bg-green-600 hover:bg-green-700'
										: plan.duration === 'THREE_MONTHS'
										? 'bg-sky-500 hover:bg-sky-600'
										: plan.duration === 'SIX_MONTHS'
										? 'bg-indigo-600 hover:bg-indigo-700'
										: 'bg-sky-600 hover:bg-sky-700'
								}`}
							>
								<ButtonLoader />
							</Button>
						) : (
							<>
								{currentPlan.id !== 0 &&
								plan.id === currentPlan.id ? (
									<Button
										type='button'
										disabled={
											loading ||
											userPremiumSubscription !== null
										}
										onClick={async () => {
											if (!user) {
												return router.push('/signin');
											}

											premiumSubscriptionCheckoutModal.onOpen();
											updatePremiumSubscriptionPlanInfo(
												currentPlan?.id,
												currentPlan?.amount
											);
										}}
										className={`text-white h-10 w-fit rounded-full py-3 text-xs ${
											plan.duration === 'ONE_MONTH'
												? 'bg-green-600 hover:bg-green-700'
												: plan.duration ===
												  'THREE_MONTHS'
												? 'bg-sky-500 hover:bg-sky-600'
												: plan.duration === 'SIX_MONTHS'
												? 'bg-indigo-600 hover:bg-indigo-700'
												: 'bg-sky-600 hover:bg-sky-700'
										}`}
									>
										{currentPlan?.buttonTitle}
									</Button>
								) : (
									// <PaystackButton
									// 	{...payStackButtonProps}
									// 	className={`text-white h-10 w-fit rounded-full px-4 py-3 text-xs ${
									// 		plan.duration === 'ONE_MONTH'
									// 			? 'bg-green-600 hover:bg-green-600'
									// 			: plan.duration ===
									// 			  'THREE_MONTHS'
									// 			? 'bg-sky-700 hover:bg-sky-700'
									// 			: plan.duration === 'SIX_MONTHS'
									// 			? 'bg-indigo-600 hover:bg-indigo-600'
									// 			: 'bg-red-700 hover:bg-red-700'
									// 	}`}
									// />
									<Button
										type='button'
										disabled={
											loading ||
											userPremiumSubscription !== null
										}
										onClick={() => {
											if (!user) {
												return router.push('/signin');
											}

											if (user?.role !== 'FARMER') {
												return toast.error(
													'Only sellers are allowed to this service.',
													{
														className:
															'text-xs, font-medium',
													}
												);
											}

											setCurrentPlan({
												id: plan.id,
												amount: plan.price,
												buttonTitle: `Proceed to checkout`,
											});
										}}
										className={`text-white h-10 w-fit rounded-full py-3 text-xs ${
											plan.duration === 'ONE_MONTH'
												? 'bg-green-600 hover:bg-green-700'
												: plan.duration ===
												  'THREE_MONTHS'
												? 'bg-sky-500 hover:bg-sky-600'
												: plan.duration === 'SIX_MONTHS'
												? 'bg-indigo-600 hover:bg-indigo-700'
												: 'bg-sky-600 hover:bg-sky-700'
										}`}
									>
										Subscribe to{' '}
										{premiumSubscriptionPlanDurationFormatter(
											plan.duration
										)}{' '}
										plan
									</Button>
								)}
							</>
						)}

						{/* <div className='text-sm space-y-3'>
							{plan.info.map((item) => (
								<div
									key={item.id}
									className='flex items-center space-x-3'
								>
									<CheckCircle
										size={16}
										className='text-main'
									/>
									<p>{item.title}</p>
								</div>
							))}
						</div> */}
					</div>
				))}
			</div>
		</main>
	);
};

export default PricingPage;
