'use client';
import Image from 'next/image';
import {useReducer} from 'react';

import {Button} from '@/components/ui/button';
import FormTextInput from '@/components/input/form-text-input';
import SelectDropdown from '@/components/ui/select-dropdown';

type FormData = {
	firstName: string;
	lastName: string;
	companyName: string;
	streetAddress: string;
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
	companyName: '',
	streetAddress: '',
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

const BillingSettings = () => {
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log('[BILLING-PAYLOAD] :: ', formData);
	};

	return (
		<div className='w-full py-3  flex flex-col bg-white border rounded'>
			<h1 className='font-medium text-base px-4'>Billing Settings</h1>

			<div className='flex items-start justify-between w-full border-t mt-2 py-4 px-4'>
				<form
					onSubmit={handleSubmit}
					className='w-full flex flex-col space-y-3'
				>
					<div className='flex items-center justify-between w-full'>
						<div className='space-y-1 w-[30%]'>
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
						<div className='space-y-1 w-[30%]'>
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
						<div className='space-y-1 w-[30%]'>
							<p className='text-sm'>Company Name (Optional)</p>
							<FormTextInput
								name='email'
								padding='py-3 px-4'
								value={formData.email}
								handleChange={handleChange}
								placeHolder='Email'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
					</div>

					<div className='space-y-1'>
						<p className='text-sm'>Street Address</p>
						<FormTextInput
							name='streetAddress'
							padding='py-3 px-4'
							handleChange={handleChange}
							value={formData.streetAddress}
							placeHolder='New Rayfield, Road 33, Abuja Street'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					<div className='flex items-center justify-between w-full'>
						<div className='space-y-1 w-[48%]'>
							<p className='text-sm'>State</p>
							<SelectDropdown
								label='State'
								data={[
									'Plateau',
									'Delta',
									'Lagos',
									'Kano',
									'Abia',
									'Osun',
								]}
							/>
						</div>
						<div className='space-y-1 w-[48%]'>
							<p className='text-sm'>City</p>
							<SelectDropdown
								label='City'
								data={[
									'Jos South',
									'Jos North',
									'Mangu',
									'Kanke',
									'Shendam',
									'Jos East',
								]}
							/>
						</div>
					</div>

					<div className='flex items-center justify-between w-full'>
						<div className='space-y-1 w-[48%]'>
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
						<div className='space-y-1 w-[48%]'>
							<p className='text-sm'>Phone Number</p>
							<FormTextInput
								name='phoneNumber'
								padding='py-3 px-4'
								value={formData.phoneNumber}
								handleChange={handleChange}
								placeHolder='Phone number'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
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

export default BillingSettings;
