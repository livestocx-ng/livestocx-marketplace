'use client';
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from '@/components/ui/tooltip';
import {
	useGlobalStore,
	usePremiumSubscriptionSuccessModalStore,
	usePremiumSubscriptionCheckoutModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {PaystackButton} from 'react-paystack';
import {NigerianCities, NigerianStates} from '@/data';
import {useEffect, useReducer, useState} from 'react';
import {CircleDollarSign, Info, X} from 'lucide-react';
import {
	ValidatePremiumSubscriptionCheckoutStepOneFormData,
	ValidatePremiumSubscriptionCheckoutStepTwoFormData,
} from '@/utils/form-validations/auth.validation';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';
import {generateRandomPaymentReference} from '@/utils/promotion.util.formatter';

type FormData = {
	name: string;
	email: string;
	phoneNumber: string;
	address: string;
	slug: string;
	state: string;
	city: string;
	facebookUrl: string;
	instagramUrl: string;
	twitterUrl: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	name: '',
	email: '',
	phoneNumber: '',
	address: '',
	slug: '',
	state: '',
	city: '',
	facebookUrl: '',
	instagramUrl: '',
	twitterUrl: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const PremiumSubscriptionCheckoutModal = () => {
	const {
		user,
		updateUser,
		vendorProfile,
		updateVendorProfile,
		premiumSubscriptionPlanId,
		premiumSubscriptionPlanAmount,
		updateUserPremiumSubscription,
	} = useGlobalStore();

	const {onClose} = usePremiumSubscriptionCheckoutModalStore();
	const premiumSubscriptionSuccessModal =
		usePremiumSubscriptionSuccessModalStore();

	const [formStep, setFormStep] = useState<number>(1);
	const [vendorSlugExists, setVendorSlugExists] = useState<boolean>(false);
	const [isValidateStepOneFormPending, setIsValidateStepOneFormPending] =
		useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);
	const [isFormDataValidated, setIsFormDataValidated] =
		useState<boolean>(false);
	const [
		isCreatePremiumSubscriptionPending,
		setCreatePremiumSubscriptionPending,
	] = useState<boolean>(false);

	const fetchVendorProfile = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/vendor/profile`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updateVendorProfile(data.data);
		} catch (error) {
			const _error = error as AxiosError;
		}
	};

	useEffect(() => {
		fetchVendorProfile();
	}, []);

	useEffect(() => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				name: vendorProfile?.name,
				slug: vendorProfile?.slug,
				city: vendorProfile?.city,
				state: vendorProfile?.state,
				email: vendorProfile?.email,
				address: vendorProfile?.address,
				phoneNumber: vendorProfile?.phoneNumber,
				facebookUrl: vendorProfile?.facebookUrl,
				instagramUrl: vendorProfile?.instagramUrl,
				twitterUrl: vendorProfile?.twitterUrl,
			},
		});

		setVendorSlugExists(vendorProfile?.slug?.length !== 0 ? true : false);
	}, [vendorProfile]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleStepOneFormSubmit = async () => {
		try {
			setIsValidateStepOneFormPending(true);

			const validationError =
				ValidatePremiumSubscriptionCheckoutStepOneFormData(formData);

			if (validationError) {
				setIsValidateStepOneFormPending(false);

				return toast.error(validationError, {
					duration: 10000,
					className: 'text-sm',
				});
			}

			const sellerSlugAvailability = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/seller-slug-availability?slug=${formData.slug}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			if (sellerSlugAvailability.data.data === true) {
				return toast.error('Business domain handle already exists!', {
					duration: 10000,
					className: 'text-sm',
				});
			}

			setFormStep(2);
			setIsValidateStepOneFormPending(false);
		} catch (error) {
			setIsValidateStepOneFormPending(false);

			const _error = error as AxiosError;

			toast.error('An error occurred');
		}
	};

	const handleStepTwoFormSubmit = async () => {
		try {
			setCreatePremiumSubscriptionPending(true);

			const validationError =
				ValidatePremiumSubscriptionCheckoutStepTwoFormData(formData);

			if (validationError) {
				setCreatePremiumSubscriptionPending(false);

				return toast.error(validationError, {
					duration: 10000,
					className: 'text-sm',
				});
			}

			setIsFormDataValidated(true);
			setCreatePremiumSubscriptionPending(false);
		} catch (error) {
			setCreatePremiumSubscriptionPending(false);
			const _error = error as AxiosError;

			// console.log('[UPDATE-VENDOR-PROFILE-ERROR]', _error);
		}
	};

	const handleClose = () => {
		toast.error('Payment cancelled!');
	};

	const handleCreatePremiumSubscription = async (response: any) => {
		try {
			setCreatePremiumSubscriptionPending(true);

			const [profileUpdateResponse, createPremiumSubscriptionResponse] =
				await Promise.all([
					axios.patch(
						`${process.env.NEXT_PUBLIC_API_URL}/vendor/premium-subscription-update-profile`,
						formData,
						{
							headers: {
								Authorization: user?.accessToken,
							},
						}
					),
					axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/vendor/create-premium-subscription?plan=${premiumSubscriptionPlanId}`,
						{
							payment_gateway: 'PAYSTACK',
							payment_date: new Date(),
							payment_reference: response?.reference,
							payment_method: 'WEB',
						},
						{
							headers: {
								Authorization: user?.accessToken,
							},
						}
					),
				]);

			if (profileUpdateResponse.status === 200) {
				const cookieUpdate = await axios.patch(
					'/api/auth/update-cookies',
					{
						isVendorProfileUpdated: true,
					}
				);

				updateUser(cookieUpdate.data);
				updateVendorProfile(profileUpdateResponse.data.data);

				setCreatePremiumSubscriptionPending(false);

				updateUserPremiumSubscription(
					createPremiumSubscriptionResponse.data.data
				);

				toast.success(`Premium subscription successful!`, {
					duration: 3500,
					className: 'text-sm',
				});

				onClose();

				premiumSubscriptionSuccessModal.onOpen();
			}
		} catch (error) {
			setCreatePremiumSubscriptionPending(false);

			const _error = error as AxiosError;

			console.log('[PREMIUM-SUBSCRIPTION-PAYMENT-ERROR]', _error);

			toast.error('An error occurred.');
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
					value: 'PREMIUM_SUBSCRIPTION',
				},
				{
					display_name: 'premium_subscription_plan',
					variable_name: 'premium_subscription_plan',
					value: premiumSubscriptionPlanId,
				},
			],
		},
		amount: premiumSubscriptionPlanAmount * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
		text: 'Proceed to payment',
		onSuccess: (response: any) => handleCreatePremiumSubscription(response),
		onClose: handleClose,
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-[15]'>
			<div className='flex flex-col w-[90%] md:w-[50%] bg-white pt-2 pb-5 px-4 max-h-[650px] overflow-y-auto scrollbar__1'>
				<div className='flex items-center justify-between px4'>
					<h1 className='font-medium text-sky-600'>Checkout</h1>

					<Button
						type='button'
						onClick={() => {
							if (isCreatePremiumSubscriptionPending) return;

							onClose();
						}}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				{formStep === 1 && (
					<div className='flex flex-col space-y-2 w-full py-3'>
						<div className='w-full'>
							<p className='text-xs md:text-sm font-medium'>
								Business Name{' '}
								<span className='text-red-500'>*</span>
							</p>
							<FormTextInput
								name='name'
								padding='py-4 px-4'
								value={formData.name}
								placeHolder='Business Name'
								handleChange={handleChange}
								disabled={isCreatePremiumSubscriptionPending}
								classes='w-full text-xs md:text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>

						<div className='w-full'>
							<p className='text-xs md:text-sm font-medium flex items-center space-x-2'>
								<p>Business Handle</p>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Info size={14} />
										</TooltipTrigger>
										<TooltipContent className='w-[350px]'>
											<p className='text-sm font-normal'>
												This value will be used to
												create your custom domain link.
												&nbsp;
												<span className='font-medium'>
													https://livestocx.com/store/link
												</span>
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<p className='text-red-500'>*</p>
							</p>
							<FormTextInput
								name='slug'
								disabled={
									isCreatePremiumSubscriptionPending ||
									vendorSlugExists
								}
								padding='py-4 px-4'
								value={formData.slug}
								handleChange={handleChange}
								placeHolder='Enter store name to see how your handle will look'
								classes='w-full text-xs md:text-sm placeholder:text-xs border focus:border-slate-500 rounded'
							/>

							<Badge
								variant={'secondary'}
								className='text-sky-500 text-xs'
							>
								https://livestocx.com/store/{formData.slug}
							</Badge>
						</div>

						<div className='w-full'>
							<p className='text-xs md:text-sm font-medium'>
								Business Email{' '}
								<span className='text-red-500'>*</span>
							</p>
							<FormTextInput
								name='email'
								disabled={isCreatePremiumSubscriptionPending}
								padding='py-4 px-4'
								placeHolder='Business Email'
								value={formData.email}
								handleChange={handleChange}
								classes='w-full text-xs md:text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>

						<div className='w-full'>
							<p className='text-xs md:text-sm font-medium'>
								Phone Number{' '}
								<span className='text-red-500'>*</span>
							</p>
							<FormTextInput
								type='text'
								name='phoneNumber'
								padding='py-3 px-4'
								disabled={isCreatePremiumSubscriptionPending}
								placeHolder='Phone Number'
								value={formData.phoneNumber}
								handleChange={handleChange}
								classes='w-full text-xs md:text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>

						<div className='w-full'>
							<p className='text-xs md:text-sm font-medium'>
								Business Address{' '}
								<span className='text-red-500'>*</span>
							</p>
							<FormTextInput
								type='text'
								name='address'
								padding='py-3 px-4'
								disabled={isCreatePremiumSubscriptionPending}
								placeHolder='Business Address'
								value={formData.address}
								handleChange={handleChange}
								classes='w-full text-xs md:text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
					</div>
				)}

				{formStep === 2 && (
					<div className='flex flex-col space-y-2 w-full py-3'>
						<div className='w-full'>
							<p className='text-xs md:text-sm font-medium'>
								Business State{' '}
								<span className='text-red-500'>*</span>
							</p>
							<div>
								<select
									name='state'
									className='w-full border py-4 rounded px-3 text-xs md:text-sm scrollbar__1'
									onChange={handleSelectChange}
								>
									<option value=''>
										{formData.state
											? formData.state
											: 'Business State'}
									</option>
									{NigerianStates.map((option) => (
										<option
											key={option}
											value={option}
											className='cursor-pointer'
										>
											{option}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className='w-full'>
							<p className='text-xs md:text-sm font-medium'>
								Business City{' '}
								<span className='text-red-500'>*</span>
							</p>
							<div>
								<select
									name='city'
									className='w-full border py-4 rounded px-3 text-xs md:text-sm scrollbar__1'
									onChange={handleSelectChange}
								>
									<option value=''>
										{formData.city
											? formData.city
											: 'Business City'}
									</option>
									{NigerianCities[
										formData.state ? formData.state : 'Abia'
									].map((option) => (
										<option
											key={option}
											value={option}
											className='cursor-pointer'
										>
											{option}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className='w-full'>
							<p className='text-xs md:text-sm font-medium flex items-center space-x-2'>
								<p>Facebook Handle</p>
							</p>
							<FormTextInput
								name='facebookUrl'
								disabled={isCreatePremiumSubscriptionPending}
								padding='py-4 px-4'
								value={formData.facebookUrl}
								handleChange={handleChange}
								placeHolder='Enter facebook profile url'
								classes='w-full text-xs md:text-sm placeholder:text-xs border focus:border-slate-500 rounded'
							/>
						</div>

						<div className='w-full'>
							<p className='text-xs md:text-sm font-medium flex items-center space-x-2'>
								<p>Twitter Handle</p>
							</p>
							<FormTextInput
								name='twitterUrl'
								disabled={isCreatePremiumSubscriptionPending}
								padding='py-4 px-4'
								value={formData.twitterUrl}
								handleChange={handleChange}
								placeHolder='Enter twitter profile url'
								classes='w-full text-xs md:text-sm placeholder:text-xs border focus:border-slate-500 rounded'
							/>
						</div>

						<div className='w-full'>
							<p className='text-xs md:text-sm font-medium flex items-center space-x-2'>
								<p>Instagram Handle</p>
							</p>
							<FormTextInput
								name='instagramUrl'
								disabled={isCreatePremiumSubscriptionPending}
								padding='py-4 px-4'
								value={formData.instagramUrl}
								handleChange={handleChange}
								placeHolder='Enter instagram profile url'
								classes='w-full text-xs md:text-sm placeholder:text-xs border focus:border-slate-500 rounded'
							/>
						</div>
					</div>
				)}

				{formStep === 1 && (
					<>
						{isValidateStepOneFormPending ? (
							<Button
								type='button'
								variant={'outline'}
								className='w-full bg-sky-600 hover:bg-sky-600 text-xs h-12 text-white hover:text-white rounded py-3 px-8 border-0'
							>
								<ButtonLoader />
							</Button>
						) : (
							<Button
								type='button'
								variant={'outline'}
								onClick={handleStepOneFormSubmit}
								className='w-full bg-sky-600 hover:bg-sky-600 text-xs h-12 text-white hover:text-white rounded py-3 px-8 border-0'
							>
								Next
							</Button>
						)}
					</>
				)}

				{formStep === 2 && (
					<div className='flex justify-end'>
						{isCreatePremiumSubscriptionPending ? (
							<Button
								type='button'
								variant={'outline'}
								className='w-full bg-sky-600 hover:bg-sky-600 text-xs h-12 text-white hover:text-white rounded py-3 px-8 border-0'
							>
								<ButtonLoader />
							</Button>
						) : isFormDataValidated ? (
							<PaystackButton
								{...payStackButtonProps}
								className={`text-white h-12 w-full rounded px-4 py-3 text-[10px] md:text-xs bg-sky-600 hover:bg-sky-600`}
							/>
						) : (
							<div className='flex justify-between items-center w-full'>
								<Button
									type='button'
									variant={'outline'}
									onClick={() => {
										setFormStep(1);

										setIsFormDataValidated(false);
										setCreatePremiumSubscriptionPending(
											false
										);
									}}
									className='w-fit bg-slate-500 hover:bg-slate-500 text-[10px] md:text-xs h-12 text-white hover:text-white rounded py-3 px-8 border-0'
								>
									Back
								</Button>
								<Button
									type='button'
									variant={'outline'}
									onClick={handleStepTwoFormSubmit}
									className='w-fit bg-sky-600 hover:bg-sky-600 text-[10px] md:text-xs h-12 text-white hover:text-white rounded py-3 px-8 border-0 flex items-center space-x-2'
								>
									<p>Proceed to Checkout</p>{' '}
									<CircleDollarSign size={15} />
								</Button>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default PremiumSubscriptionCheckoutModal;
