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
	newPassword: string;
	confirmPassword: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA' | 'UPDATE';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	newPassword: '',
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

		router.push('/signin');
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
						Reset Password
					</h1>
					<div className='space-y-4'>
						<FormPasswordInput
							name='newPassword'
							padding='py-4 px-4'
							value={formData.newPassword}
							handleChange={handleChange}
							placeHolder='New Password'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
						/>
						<FormPasswordInput
							padding='py-4 px-4'
							name='confirmPassword'
							handleChange={handleChange}
							placeHolder='Confirm New Password'
							value={formData.confirmPassword}
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
						/>

						<Button
							type='submit'
							className='bg-green-600 text-white h-12 hover:bg-green-700 w-full rounded-full py-4'
						>
							Create New Password
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignInPage;
