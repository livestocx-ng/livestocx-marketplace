'use client';

import {useReducer} from 'react';
import FormTextInput from '@/components/input/form-input';
import AuthHeader from '../components/auth-header';
import Link from 'next/link';
import {Separator} from '@/components/ui/separator';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import FormPasswordInput from '@/components/input/form-password-input';

type FormData = {
	email: string;
	password: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA' | 'UPDATE';
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
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log('[SIGNIN-PAYLOAD] :: ', formData);
	};

	return (
		<div className='w-full'>
			<AuthHeader />

			<div className='flex flex-col justify-center items-center  py-20'>
				<form
					autoComplete='off'
					onSubmit={handleSubmit}
					className='w-[90%] sm:w-[600px] py-10 px-4 sm:px-10 border rounded-lg shadow-md flex flex-col space-y-8'
				>
					<h1 className='text-center text-2xl font-semibold'>
						Sign In
					</h1>
					<div className='space-y-4'>
						<FormTextInput
							name='email'
							padding='py-4 px-4'
							value={formData.email}
							handleChange={handleChange}
							placeHolder='Email'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
						/>
						<FormPasswordInput
							name='password'
							padding='py-4 px-4'
							value={formData.password}
							handleChange={handleChange}
							placeHolder='Password'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
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
								className='text-sm text-green-600 font-semibold'
							>
								Forgot Password?
							</Link>
						</div>

						<Button
							type='submit'
							className='bg-green-600 text-white h-12 hover:bg-green-700 w-full rounded-full py-4'
						>
							Sign In
						</Button>

						<div className='flex items-center justify-between space-x-3'>
							<Separator className='w-[43%]' />
							<span>Or</span>
							<Separator className='w-[43%]' />
						</div>

						<Button
							type='button'
							variant={'outline'}
							className='flex items-center gap-x-4 h-12 justify-center w-full rounded-full py-4'
						>
							<Image
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
	);
};

export default SignInPage;