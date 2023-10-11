'use client';

import {useReducer} from 'react';
import FormTextInput from '@/components/input/form-text-input';
import AuthHeader from '../../../../components/header/auth-header';
import Link from 'next/link';
import {Separator} from '@/components/ui/separator';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import FormPasswordInput from '@/components/input/form-password-input';
import {useRouter} from 'next/navigation';

type FormData = {
	email: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA' | 'UPDATE';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	email: '',
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

		router.push('/forgot-password/otp');
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
					<div className='space-y-3'>
						<h1 className='text-center text-2xl font-semibold'>
							Forgot Password
						</h1>
						<p className='text-center text-sm'>
							Please enter your email address. You will receive a
							code to create a new password via email.
						</p>
					</div>

					<div className='space-y-4'>
						<FormTextInput
							name='email'
							padding='py-4 px-4'
							value={formData.email}
							handleChange={handleChange}
							placeHolder='Email address'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
						/>

						<Button
							type='submit'
							className='bg-green-600 text-white h-12 hover:bg-green-700 w-full rounded-full py-4'
						>
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignInPage;
