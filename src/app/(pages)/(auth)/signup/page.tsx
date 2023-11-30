'use client';
import Link from 'next/link';
import Image from 'next/image';
import {NigeriaStates} from '@/data';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {useEffect, useReducer, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';
import AuthHeader from '../../../../components/header/auth-header';
import FormPasswordInput from '@/components/input/form-password-input';
import {useUpdateWelcomeFarmerModalStore} from '@/hooks/use-global-store';
import {ValidateSignupFormData} from '@/utils/form-validations/auth.validation';

type FormData = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	password: string;
	role: 'FARMER' | 'CUSTOMER';
	location: string;
	acceptedTerms: boolean;
	confirmPassword: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	firstName: '',
	lastName: '',
	phoneNumber: '',
	email: '',
	password: '',
	location: '',
	role: 'CUSTOMER',
	acceptedTerms: false,
	confirmPassword: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const SignUpPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const welcomeFarmerModal = useUpdateWelcomeFarmerModalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	useEffect(() => {
		if (searchParams.get('seller')) {
			updateFormData({
				type: 'UPDATE_FORMDATA',
				payload: {role: 'FARMER'},
			});
		}
	}, [searchParams.get('seller')]);

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

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			const validationError = ValidateSignupFormData(formData);

			if (validationError) {
				setLoading(false);
				return toast.error(validationError, {duration: 10000});
			}

			console.log('[SIGNUP-PAYLOAD] :: ', formData);

			const emailAvailability = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/email-availability?email=${formData.email}`
			);

			if (!emailAvailability.data.data) {
				setLoading(false);
				return toast.error('Email already exists', {duration: 10000});
			}

			const {data} = await axios.post('/api/auth/signup', formData);

			console.log('[DATA] :: ', data);

			if (data?.ok == false) {
				setLoading(false);

				toast.error('An error occured');
			} else {
				setLoading(false);

				toast.success('Account created successfully');

				router.push('/signin');

				setTimeout(() => {
					if (formData.role === 'FARMER') {
						welcomeFarmerModal.onOpen();
					}
				}, 2000);
			}
		} catch (error) {
			setLoading(false);

			console.error('[SIGNUP-ERROR]', error);

			toast.error('An error occured');
		}
	};

	return (
		<div className='w-full'>
			<AuthHeader />

			<div className='flex flex-col justify-center items-center  py-20'>
				<form
					autoComplete='off'
					onSubmit={handleSubmit}
					className='w-[90%] sm:w-[600px] py-10 px-4 sm:px-10 border rounded shadow-md flex flex-col space-y-8'
				>
					<h1 className='text-center text-2xl font-semibold'>
						Sign Up
					</h1>
					<div className='space-y-4'>
						<FormTextInput
							name='firstName'
							padding='py-4 px-4'
							value={formData.firstName}
							handleChange={handleChange}
							placeHolder='First Name'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
						<FormTextInput
							name='lastName'
							padding='py-4 px-4'
							value={formData.lastName}
							handleChange={handleChange}
							placeHolder='Last Name'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
						<FormTextInput
							name='phoneNumber'
							type='number'
							padding='py-4 px-4'
							value={formData.phoneNumber}
							handleChange={handleChange}
							placeHolder='Phone Number'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
						<FormTextInput
							name='email'
							padding='py-4 px-4'
							value={formData.email}
							handleChange={handleChange}
							placeHolder='Email'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>

						<div>
							<select
								name='location'
								className='w-full border py-4 rounded px-3 text-sm scrollbar__1'
								onChange={handleSelectChange}
							>
								<option value=''>Location</option>
								{NigeriaStates.map((option) => (
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

						<FormPasswordInput
							name='password'
							padding='py-4 px-4'
							value={formData.password}
							handleChange={handleChange}
							placeHolder='Password'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
						<FormPasswordInput
							name='confirmPassword'
							padding='py-4 px-4'
							value={formData.confirmPassword}
							handleChange={handleChange}
							placeHolder='Confirm Password'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>

						<div className='flex flex-col space-y-5'>
							<p className='text-sm text-center'>
								Do you want to signup as a
							</p>
							<div className='flex justify-center space-x-10'>
								<div className='space-x-3 flex items-center'>
									<p className='text-sm'>Buyer</p>
									<input
										name='role'
										value={'CUSTOMER'}
										checked={formData.role === 'CUSTOMER'}
										type='radio'
										onChange={(
											event: React.ChangeEvent<HTMLInputElement>
										) => {
											updateFormData({
												type: 'UPDATE_FORMDATA',
												payload: {
													role: 'CUSTOMER',
												},
											});
										}}
									/>
								</div>
								<div className='space-x-3 flex items-center'>
									<p className='text-sm'>Seller</p>
									<input
										name='role'
										value={'FARMER'}
										checked={formData.role === 'FARMER'}
										type='radio'
										onChange={(
											event: React.ChangeEvent<HTMLInputElement>
										) => {
											updateFormData({
												type: 'UPDATE_FORMDATA',
												payload: {
													role: 'FARMER',
												},
											});
										}}
									/>
								</div>
							</div>
						</div>

						<div className='flex justify-center'>
							<div className='space-x-3 flex items-center'>
								{' '}
								<input
									type='checkbox'
									disabled={loading}
									checked={formData.acceptedTerms}
									onChange={() => {
										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												acceptedTerms:
													!formData.acceptedTerms,
											},
										});
									}}
								/>
								<p className='text-sm'>
									I agree your{' '}
									<Link
										target='_blank'
										className='text-main'
										href={'/terms-of-service'}
									>
										Terms of service
									</Link>{' '}
									and{' '}
									<Link
										target='_blank'
										className='text-main'
										href={'/privacy-policy'}
									>
										Privacy Policy
									</Link>
								</p>
							</div>
						</div>

						{loading ? (
							<Button
								type='button'
								className='bg-green-700 text-white h-12 hover:bg-green-700 w-full rounded-full py-3 cursor-default'
							>
								<ButtonLoader />
							</Button>
						) : (
							<Button
								type='submit'
								className='bg-green-600 text-white h-12 hover:bg-green-700 w-full rounded-full py-3'
							>
								Sign Up
							</Button>
						)}

						<div className='flex items-center justify-between space-x-3'>
							<Separator className='w-[43%]' />
							<span>Or</span>
							<Separator className='w-[43%]' />
						</div>

						<Button
							type='button'
							variant={'outline'}
							className='flex items-center gap-x-4 h-12 justify-center w-full rounded-full py-3'
						>
							<Image
								alt='google icon'
								src={'/icon_google.svg'}
								width={30}
								height={30}
							/>
							<p>Continue with Google</p>
						</Button>

						{/* <div className='flex justify-center mt-5'>
							<Link
								href='/farmer/signup'
								className='text-sm text-center mx-auto'
							>
								Are you a farmer?{' '}
								<span className='text-main'>Register here</span>
							</Link>
						</div> */}
						<div className='flex justify-center mt-5'>
							<Link
								href='/signin'
								className='text-sm text-center mx-auto'
							>
								Already have an account?{' '}
								<span className='text-main'>Login</span>
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpPage;
