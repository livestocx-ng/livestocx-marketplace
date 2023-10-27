'use client';
import Image from 'next/image';
import {useReducer} from 'react';

import {Button} from '@/components/ui/button';
import FormPasswordInput from '@/components/input/form-password-input';

type FormData = {
	newPassword: string;
	confirmPassword: string;
	currentPassword: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA' | 'UPDATE';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	newPassword: '',
	confirmPassword: '',
	currentPassword: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const PasswordSettings = () => {
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log('[PASSWORD-PAYLOAD] :: ', formData);
	};

	return (
		<div className='w-full py-3  flex flex-col bg-white border rounded'>
			<h1 className='font-medium text-base px-4'>Password Settings</h1>

			<div className='flex items-start justify-between w-full border-t mt-2 py-4 px-4'>
				<form
					onSubmit={handleSubmit}
					className='w-full flex flex-col space-y-3'
				>
					<div className='space-y-1'>
						<p className='text-sm'>Password</p>
						<FormPasswordInput
							name='password'
							padding='py-4 px-4'
							value={formData.currentPassword}
							handleChange={handleChange}
							placeHolder='Current Password'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
						/>
					</div>

					<div className='flex items-center justify-between w-full'>
						<div className='space-y-1 w-[48%]'>
							<p className='text-sm'>New Password</p>
							<FormPasswordInput
								name='password'
								padding='py-4 px-4'
								value={formData.newPassword}
								handleChange={handleChange}
								placeHolder='New Password'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
							/>
						</div>
						<div className='space-y-1 w-[48%]'>
							<p className='text-sm'>Confirm Password</p>
							<FormPasswordInput
								name='password'
								padding='py-4 px-4'
								value={formData.confirmPassword}
								handleChange={handleChange}
								placeHolder='Confirm Password'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded-lg'
							/>
						</div>
					</div>

					<Button
						type='submit'
						className='bg-green-500 text-white hover:bg-green-600 hover:text-white w-fit px-3 rounded'
					>
						Save Changes
					</Button>
				</form>
			</div>
		</div>
	);
};

export default PasswordSettings;
