'use client';
import Image from 'next/image';
import {useReducer} from 'react';

import {Button} from '@/components/ui/button';
import FormTextInput from '@/components/input/form-text-input';

type FormData = {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA' | 'UPDATE';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	firstName: '',
	lastName: '',
	email: '',
	phoneNumber: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const AccountSettings = () => {
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log('[ACCOUNT-PAYLOAD] :: ', formData);
	};

	// const handleAvatarSubmit = (event: React.FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();

	// 	console.log('[ACCOUNT-AVATAR-PAYLOAD] :: ', formData);
	// };

	return (
		<div className='w-full py-3  flex flex-col bg-white border rounded'>
			<h1 className='font-medium text-base px-4'>Account Settings</h1>

			<div className='flex items-start justify-between w-full border-t mt-2 py-4 px-4'>
				<form
					onSubmit={handleSubmit}
					className='w-[55%] flex flex-col space-y-3'
				>
					<div className='space-y-1'>
						<p className='text-sm'>First Name</p>
						<FormTextInput
							name='firstName'
							padding='py-3 px-4'
							value={formData.email}
							handleChange={handleChange}
							placeHolder='First name'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>
					<div className='space-y-1'>
						<p className='text-sm'>Last Name</p>
						<FormTextInput
							name='lastName'
							padding='py-3 px-4'
							value={formData.lastName}
							handleChange={handleChange}
							placeHolder='Last name'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>
					<div className='space-y-1'>
						<p className='text-sm'>Email</p>
						<FormTextInput
							name='email'
							padding='py-3 px-4'
							value={formData.email}
							handleChange={handleChange}
							placeHolder='Email'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>
					<div className='space-y-1'>
						<p className='text-sm'>Phone Number</p>
						<FormTextInput
							name='phoneNumber'
							padding='py-3 px-4'
							value={formData.email}
							handleChange={handleChange}
							placeHolder='Phone Number'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					<Button
						type='submit'
						className='bg-green-500 text-white hover:bg-green-600 hover:text-white w-fit px-3 rounded'
					>
						Save Changes
					</Button>
				</form>

				<div
					// onSubmit={handleAvatarSubmit}
					className='flex flex-col items-center justify-center space-y-3 w-[45%]'
				>
					<Image
						alt='image'
						width={150}
						height={150}
						src={'/user__1.svg'}
						className='rounded-full'
					/>

					<Button
						type='submit'
						// variant={'outline'}
						className='border border-green-500 bg-white hover:bg-white text-green-500 hover:border-green-600 hover:text-green-600 w-fit px-3 rounded'
					>
						Choose Image
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AccountSettings;
