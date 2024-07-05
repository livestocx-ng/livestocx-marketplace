'use client';
import Image from 'next/image';
import {
	useGlobalStore,
	usePremiumSubscriptionCheckoutModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import {useRef, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {enterprisePlanComparisons} from '@/data';
import {DataTable} from '@/components/ui/data-table';
import {PriceFormatter} from '@/utils/price.formatter';
import ButtonLoader from '@/components/loader/button-loader';
import {premiumSubscriptionPlanDurationFormatter} from '@/utils';
import {BadgeCheck, Laptop, Award, PieChart, MessageCircle} from 'lucide-react';
import {EnterprisePlansComparisonsColumns} from './components/pricing-columns';
import axios from 'axios';
import Link from 'next/link';

const PricingPage = () => {
	const router = useRouter();

	const {
		user,
		userPremiumSubscription,
		premiumSubscriptionPlans,
		updatePremiumSubscriptionPlanInfo,
	} = useGlobalStore();

	const premiumSubscriptionCheckoutModal =
		usePremiumSubscriptionCheckoutModalStore();

	const subscriptionPlansRef = useRef<HTMLDivElement>(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [currentPlan, setCurrentPlan] = useState<{
		id: number;
		amount: number;
		buttonTitle: string;
	}>({id: 0, amount: 0, buttonTitle: ''});

	const handlePremiumSubscriptionInquiry = async () => {
		await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/vendor/premium-subscription-inquiry`,
			{},
			{
				headers: {
					Authorization: user?.accessToken,
				},
			}
		);
	};

	return (
		<main className='relative'>
			<Link
				target='_blank'
				href={`https://wa.me/+2348132549273`}
				className='fixed bottom-[50px] right-5 space-y-1 flex flex-col items-center cursor-pointer z-10 backdrop-blur-sm p-2 rounded-md bg-[#ffffff90]'
			>
				<div className='h-10 w-10 bg-green-500 rounded-full flex items-center justify-center'>
					<MessageCircle size={18} className='text-white' />
				</div>
				<p className='text-[10px] md:text-xs font-medium'>Contact us</p>
			</Link>

			<section className='w-full bg-gradient-to-b from-green-800 to-green-50 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 pt-20'>
				<div className='flex flex-col space-y-4 w-full md:w-[45%]'>
					<h1 className='text-xl md:text-5xl text-white font-semibold text-center md:text-left'>
						Livestocx for businesses
					</h1>

					<p className='text-sm md:text-lg text-white font-medium text-center md:text-left leading-8'>
						Expand your business reach. Sell to thousands on our
						Marketplace and showcase your products with our custom
						website and catalog built for you.
					</p>

					<Button
						type='button'
						onClick={async () => {
							if (subscriptionPlansRef.current) {
								subscriptionPlansRef.current.scrollIntoView({
									behavior: 'smooth',
								});
							}

							if (user) {
								handlePremiumSubscriptionInquiry();
							}
						}}
						className='bg-sky-600 text-white hover:bg-sky-700 w-fit rounded-md py-8 px-4 md:px-8 mx-auto md:mx-0'
					>
						Get Started
					</Button>
				</div>

				<div className='h-[200px] md:h-[400px] w-full md:w-[50%] relative mt-5 md:mt-0'>
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
					<div className='h-[220px] md:h-[400px] w-full md:w-[45%] relative mb-10 md:mb-0'>
						<Image
							alt=''
							fill
							className='object-fill rounded-md'
							src={'/animals/image__chicken__2.jpg'}
						/>
					</div>
					<div className='w-full md:w-[50%] space-y-10'>
						<div className='space-y-3 list-none'>
							<div className=' flex items-start justify-between space-x-'>
								<div className='h-[30px] w-[30px] relativ'>
									<BadgeCheck
										size={22}
										className='text-green-600'
									/>
									{/* <Image
									alt=''
									fill
									src={'/icon__check.svg'}
									className='object-fill absolute'
								/> */}
								</div>
								<p className='text-sm md:text-base w-[90%] md:w-[95%]'>
									Become verified
								</p>
							</div>
							<div className='flex items-start justify-between space-x-'>
								<div className='h-[30px] w-[30px] relativ'>
									<Laptop
										size={22}
										className='text-green-600'
									/>
									{/* <Image
									alt=''
									fill
									src={'/icon__laptop.svg'}
									className='object-fill absolute'
								/> */}
								</div>

								<p className='text-sm md:text-base w-[90%] md:w-[95%]'>
									Have a mini-website/online store for your
									business that you can share with your
									customers.
								</p>
							</div>
							<div className=' flex items-start justify-between space-x-'>
								<div className='h-[30px] w-[30px] relativ'>
									<Award
										size={22}
										className='text-green-600'
									/>
									{/* <Image
									alt=''
									fill
									src={'/icon__badge.svg'}
									className='object-fill absolute'
								/> */}
								</div>
								<p className='text-sm md:text-base w-[90%] md:w-[95%]'>
									Get one free monthly product promotion
								</p>
							</div>
							<div className=' flex items-start justify-between space-x-'>
								<div className='h-[30px] w-[30px] relativ'>
									<PieChart
										size={22}
										className='text-green-600'
									/>
									{/* <Image
									alt=''
									fill
									src={'/icon__chart_line.svg'}
									className='object-cover absolute'
								/> */}
								</div>
								<p className='text-sm md:text-base w-[90%] md:w-[95%]'>
									Have access to analytics and sales features.
								</p>
							</div>
						</div>

						<div className='flex flex-col space-y-2'>
							<div className='flex items-center font-medium space-x-4'>
								<Image
									width={60}
									height={60}
									alt='testimonial'
									unoptimized={true}
									src={'/vendor.jpg'}
									className='border border-slate-300 shadow-md shadow-slate-200 rounded-full'
								/>

								<p className='text-sm md:text-base font-semibold'>
									Grace Horizon Foods Limited
								</p>
							</div>

							<p className='text-sm md:text-base'>
								Thanks to Livestocx, my poultry business now has
								a professional online presence. The platform's
								features are top-notch, and the ease of setting
								up a custom store has saved me so much time.
								Sales have never been better!
							</p>
						</div>
					</div>
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
												return router.push(
													'/signin?redirect_to=business'
												);
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
									<Button
										type='button'
										disabled={
											loading ||
											userPremiumSubscription !== null
										}
										onClick={() => {
											if (!user) {
												return router.push(
													'/signin?redirect_to=business'
												);
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

											handlePremiumSubscriptionInquiry();
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

			<div className='w-full py-5 px-4 md:px-[160px] my-10 flex flex-col space-y-5'>
				<h1 className='font-medium text-lg md:text-4xl text-center'>
					Livestocx Plugin
				</h1>

				<p className='text-sm md:text-lg'>
					You can now seamlessly integrate your Livestocx catalog or
					products into your existing website, similar to how Calendly
					and Typeform work. This powerful feature allows you to
					display your products directly on your site, enhancing your
					online presence and engaging customers without requiring
					them to leave your platform. Email us for more information
					at support@livestocx.com
				</p>
			</div>
		</main>
	);
};

export default PricingPage;
