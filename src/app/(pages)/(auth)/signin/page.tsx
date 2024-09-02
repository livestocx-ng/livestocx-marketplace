'use client';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import {toast} from 'react-hot-toast';
import {signIn} from 'next-auth/react';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import Footer from '@/components/navigation/footer';
import {PriceFormatter} from '@/utils/price.formatter';
import {useGlobalStore} from '@/hooks/use-global-store';
import {useRouter, useSearchParams} from 'next/navigation';
import ButtonLoader from '@/components/loader/button-loader';
import MainNavbar from '@/components/navigation/main-nav-bar';
import FormTextInput from '@/components/input/form-text-input';
import {Fragment, useEffect, useReducer, useState} from 'react';
import FormPasswordInput from '@/components/input/form-password-input';
import {ValidateSigninFormData} from '@/utils/form-validations/auth.validation';

type FormData = {
	email: string;
	password: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	email: '',
	password: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const SignInPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const {user, updateUser, updateChatConversations} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	useEffect(() => {
		if (user) {
			return router.push('/');
		}
	}, [user]);

	useEffect(() => {
		if (searchParams.get('redirect_to') !== null) {
			localStorage.setItem(
				'LIVESTOCX_AUTH_REDIRECT',
				searchParams.get('redirect_to')!
			);
		}
	}, [searchParams]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const validationError = ValidateSigninFormData(formData);

		if (validationError) {
			setLoading(false);
			return toast.error(validationError, {
				duration: 10000,
				className: 'text-xs sm:text-sm',
			});
		}

		try {
			setLoading(true);

			const {data} = await axios.post('/api/auth/signin', formData);

			if (data?.ok == false) {
				setLoading(false);

				toast.error('Invalid credentials', {
					className: 'text-xs sm:text-sm',
				});
			} else {
				setLoading(false);

				updateUser(data);

				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/chat/conversations?page=1`,
					{
						headers: {
							Authorization: data?.accessToken,
						},
					}
				);

				updateChatConversations(response.data.data.conversations);

				toast.success('Success', {className: 'text-xs sm:text-sm'});

				if (searchParams.has('redirect_to')!) {
					return router.push(
						`/${
							searchParams
								.get('redirect_to')!
								.includes('business')
								? 'business?subscription_now=true'
								: searchParams.get('redirect_to')!
						}`
					);
				} else {
					router.push('/');
				}
			}
		} catch (error) {
			setLoading(false);

			toast.error('Invalid credentials', {
				className: 'text-xs sm:text-sm',
			});
		}
	};

	return (
		<Fragment>
			<MainNavbar />
			<div className='w-full'>
				<section className='h-[22vh] md:h-[35vh] w-full bg-home flex flex-col items-center justify-center pt-10 md:pt-0'>
					<h1 className='text-xl md:text-5xl font-medium text-white'>
						Sign In
					</h1>
				</section>

				<div className='flex flex-col justify-center items-center pt-5 pb-20'>
					<form
						autoComplete='off'
						onSubmit={handleSubmit}
						className='w-[90%] sm:w-[600px] py-10 px-4 sm:px-10 border rounded-lg shadow-md flex flex-col space-y-8'
					>
						<h1 className='text-center text-2xl font-semibold'>
							Sign In
						</h1>
						<p className='text-sm text-center font-medium'>
							Note: Sellers pay{' '}
							{PriceFormatter(1500).split('.00')[0]} to start
							posting!
						</p>
						<div className='space-y-4'>
							<FormTextInput
								name='email'
								padding='py-4 px-4'
								value={formData.email}
								handleChange={handleChange}
								placeHolder='Email'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
							<FormPasswordInput
								name='password'
								padding='py-4 px-4'
								value={formData.password}
								handleChange={handleChange}
								placeHolder='Password'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>

							<div className='flex justify-between items-center'>
								<div className='space-x-3 flex items-center'>
									{' '}
									<input
										type='checkbox'
										name='remember-me'
										id=''
									/>
									<p className='text-sm'>Remember me</p>
								</div>
								<Link
									href='/forgot-password'
									className='text-sm text-green-600'
								>
									Forgot password?
								</Link>
							</div>

							{loading === true ? (
								<Button
									type='button'
									className='bg-green-700 text-white h-12 hover:bg-green-700 w-full rounded-full py-4 cursor-default'
								>
									<ButtonLoader />
								</Button>
							) : (
								<Button
									type='submit'
									className='bg-green-600 text-white h-12 hover:bg-green-700 w-full rounded-full py-4'
								>
									Sign In
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
								onClick={() => {
									const redirectUrl = searchParams.has(
										'redirect_to'
									)
										? searchParams
												.get('redirect_to')!
												.includes('business')
											? '/business?subscription_now=true'
											: `/${searchParams.get(
													'redirect_to'
											  )!}`
										: '/';

									signIn('google', {
										callbackUrl: redirectUrl,
									});
								}}
								className='flex items-center gap-x-4 h-12 justify-center w-full rounded-full py-4'
							>
								<Image
									unoptimized={true}
									alt='google icon'
									src={'/icon_google.svg'}
									width={30}
									height={30}
								/>
								<p>Continue with Google</p>
							</Button>

							<div className='flex justify-center mt-5'>
								<Link
									href='/signup'
									className='text-sm text-center mx-auto'
								>
									Don't have an account?{' '}
									<span className='text-main'>Register</span>
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</Fragment>
	);
};

export default SignInPage;
