import {X} from 'lucide-react';
import {
	useGlobalStore,
	useCreateProductModalStore,
	useProductUploadSubscriptionModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {PaystackButton} from 'react-paystack';
import React, {useEffect, useState} from 'react';
import {PriceFormatter} from '@/utils/price.formatter';
import ButtonLoader from '@/components/loader/button-loader';
import {generateRandomPaymentReference} from '@/utils/promotion.util.formatter';

const ProductUploadSubscriptionModal = () => {
	const router = useRouter();

	const modal = useProductUploadSubscriptionModalStore();
	const createProductModalStore = useCreateProductModalStore();

	const {user, updateUser, products, productUploadSubscriptionPlans} =
		useGlobalStore();

	const [loading, setLoading] = useState(false);
	const [currentPlan, setCurrentPlan] = useState<{
		id: number;
		amount: number;
		buttonTitle: string;
	}>({id: 0, amount: 0, buttonTitle: ''});
	const [countdown, setCountdown] = useState<number>(36000); // 24 hours in seconds
	const [endTime, setEndTime] = useState<Date | null>(null);

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600)
			.toString()
			.padStart(2, '0');
		const minutes = Math.floor((seconds % 3600) / 60)
			.toString()
			.padStart(2, '0');
		const secs = (seconds % 60).toString().padStart(2, '0');
		return `${hours}:${minutes}:${secs}`;
	};

	// Load saved countdown from localStorage
	useEffect(() => {
		const savedEndTime = localStorage.getItem(
			'LVSX_PRODUCT_UPLOAD_SUBSCRIPTION_TIMER_END_TIME'
		);
		if (savedEndTime) {
			const endTimeDate = new Date(parseInt(savedEndTime));
			setEndTime(endTimeDate);
			const remainingTime = Math.floor(
				(endTimeDate.getTime() - Date.now()) / 1000
			);
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
		const randomDuration =
			possibleDurations[
				Math.floor(Math.random() * possibleDurations.length)
			];
		const newEndTime = new Date(Date.now() + randomDuration * 1000);
		setEndTime(newEndTime);
		setCountdown(randomDuration);
		localStorage.setItem(
			'LVSX_PRODUCT_UPLOAD_SUBSCRIPTION_TIMER_END_TIME',
			newEndTime.getTime().toString()
		);
	};

	// Countdown timer
	useEffect(() => {
		const timer = setInterval(() => {
			if (endTime) {
				const remainingTime = Math.floor(
					(endTime.getTime() - Date.now()) / 1000
				);
				if (remainingTime <= 0) {
					restartCountdown();
				} else {
					setCountdown(remainingTime);
				}
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [endTime]);

	const handleClose = () => {
		toast.error('Payment cancelled!', {className: 'text-xs sm:text-sm'});
	};

	const handleCreatePremiumSubscription = async (response: any) => {
		try {
			setLoading(true);

			await axios.post(
				`${process.env.NEXT_PUBLIC_API_URL}/vendor/product-upload-subscription`,
				{
					// PAYLOAD
					payment_method: 'WEB',
					amount_paid: currentPlan.amount.toString(),
					payment_reference: response.reference,
					payment_gateway: 'PAYSTACK',
				},
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			const cookieUpdate = await axios.patch('/api/auth/update-cookies', {
				isProductUploadSubscriptionActive: true,
			});

			updateUser(cookieUpdate.data);

			toast.success(`Product upload subscription successful!`, {
				duration: 3500,
				className: 'text-xs sm:text-sm',
			});

			setLoading(false);

			modal.onClose();

			createProductModalStore.onOpen();
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			console.log('[PRODUCT-UPLOAD-SUBSCRIPTION-PAYMENT-ERROR]', _error);

			toast.error('An error occurred.', {
				className: 'text-xs sm:text-sm',
			});
		}
	};

	const payStackButtonProps = {
		reference: generateRandomPaymentReference(),
		email: user?.email!,
		metadata: {
			custom_fields: [
				{
					display_name: 'payment_type',
					variable_name: 'payment_type',
					value: 'PRODUCT_UPLOAD_SUBSCRIPTION',
				},
				{
					display_name: 'product_upload_subscription_plan',
					variable_name: 'product_upload_subscription_plan',
					value: currentPlan.id,
				},
			],
		},
		amount: currentPlan.amount * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
		text: currentPlan.buttonTitle,
		onSuccess: (response: any) => handleCreatePremiumSubscription(response),
		onClose: handleClose,
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-20'>
			<div className='flex flex-col w-[90%] lg:w-[40%] bg-white py-2 px-4 max-h-[600px] overflow-y-auto rounded-md scrollbar__1'>
				<div className='flex items-center justify-between px4 w-full'>
					<h1 className='font-medium text-sm'></h1>

					<Button
						type='button'
						disabled={loading}
						onClick={() => modal.onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col lg:flex-row lg:flex-wrap items-center lg:items-start justify-center lg:justify-evenly w-full mb-2'>
					{productUploadSubscriptionPlans?.map((plan, index) => (
						<div
							key={plan.id}
							className={`flex flex-col items-center text-center space-y-5 w-full`}
						>
							<h1 className='text-sm md:text-base font-semibold'>
								{plan.title}
							</h1>

							<h1 className='text-xs md:text-sm'>
								{products?.length > 0
									? plan.description.replace(
											'start',
											'continue'
									  )
									: plan.description}
							</h1>

							<h1 className='text-xs md:text-sm font-semibold '>
								Amount:{' '}
								<span className='underline font-bold'>
									{PriceFormatter(plan.price)}
								</span>
							</h1>

							<h1 className='text-xs text-red-500 md:text-sm font-semibold '>
								Offer ends in {formatTime(countdown)}
							</h1>

							{loading ? (
								<Button
									type='button'
									disabled={true}
									className={`text-white h-10 w-full md:w-[50%] rounded-full py-3 text-xs bg-green-400 hover:bg-green-500`}
								>
									<ButtonLoader />
								</Button>
							) : (
								<>
									{currentPlan.id !== 0 ? (
										<PaystackButton
											{...payStackButtonProps}
											className='w-full md:w-[50%] bg-green-600 hover:bg-green-700 text-xs font-medium hover:font-bold text-white hover:text-white rounded-full border-0 py-3 px-6'
										/>
									) : (
										<Button
											type='button'
											disabled={loading}
											onClick={() => {
												if (!user) {
													return router.push(
														'/signin'
													);
												}

												if (user?.role !== 'FARMER') {
													return toast.error(
														'Only sellers are allowed to this service.',
														{
															className:
																'text-xs font-medium',
														}
													);
												}

												setCurrentPlan({
													id: plan.id,
													amount: plan.price,
													buttonTitle: `Proceed to pay ${PriceFormatter(
														plan.price
													)}`,
												});
											}}
											className={`text-white h-10 w-full md:w-[50%] rounded-full py-3 text-xs font-medium bg-green-600 hover:bg-green-700`}
										>
											Pay Now
										</Button>
									)}
								</>
							)}
						</div>
					))}

					<div className='text-xs pt-2'>
						Over 3,500 farmers already paid!
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductUploadSubscriptionModal;
