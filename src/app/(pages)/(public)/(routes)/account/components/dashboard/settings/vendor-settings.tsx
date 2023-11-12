'use client';
import axios, {AxiosError} from 'axios';
import Image from 'next/image';
import {toast} from 'react-hot-toast';
import {useEffect, useReducer, useRef, useState} from 'react';

import {User} from '@/types/types';
import {useUserHook} from '@/hooks/use-user';
import {Button} from '@/components/ui/button';
import FormTextInput from '@/components/input/form-text-input';
import {ValidateUpdateProfileFormData} from '@/utils/form-validations/settings.validation';
import {useGlobalStore} from '@/hooks/use-global-store';
import ButtonLoader from '@/components/loader/button-loader';
import {ValidateUpdateVendorProfileFormData} from '@/utils/form-validations/vendor.profile.validation';

interface AccountSettingsProps {
	user: User | null;
}

type FormData = {
	name: string;
	location?: string;
	address: string;
	avatar: File | null;
	avatarUrl: string;
	email: string;
	phoneNumber: string;
	isUpdated: boolean;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	name: '',
	location: '',
	address: '',
	avatar: null,
	avatarUrl: '',
	email: '',
	phoneNumber: '',
	isUpdated: false,
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

// const VendorSettings = ({user}: AccountSettingsProps) => {
const VendorSettings = () => {
	const {user, vendor, updateVendor} = useGlobalStore();

	const avatarRef = useRef<HTMLInputElement>(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

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

			console.log('[DATA] ::  ', data);

			updateVendor(data.data);
		} catch (error) {
			const _error = error as AxiosError;

			console.log('[FETCH-VENDOR-PROFILE-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchVendorProfile();
	}, []);

	useEffect(() => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				name: vendor?.name,
				location: vendor?.location,
				address: vendor?.address,
				avatarUrl: vendor?.avatar,
				email: vendor?.email,
				phoneNumber: vendor?.phoneNumber,
				isUpdated: vendor?.isUpdated,
			},
		});
	}, [vendor]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log('[EVENT] :: ', event.target.name);

		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				avatar: event.target.files![0],
				avatarUrl: URL.createObjectURL(event.target.files![0]),
			},
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			const validationError =
				ValidateUpdateVendorProfileFormData(formData);

			if (validationError) {
				setLoading(false);
				return toast.error(validationError);
			}

			console.log('[UPDATE-VENDOR-PROFILE-PAYLOAD] :: ', formData);

			const {data} = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/vendor/update-profile`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: user?.accessToken,
					},
				}
			);

			setLoading(false);

			console.log('[VENDOR-PROFILE] :: ', data);
			updateVendor(data.data);

			toast.success('Vendor profile updated');
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			console.log('[UPDATE-VENDOR-PROFILE-ERROR]', _error);

			toast.error('Error');
		}
	};

	return (
		<div className='w-full py-2  flex flex-col bg-white border rounded'>
			<h1 className='font-medium text-base px-4'>Vendor Settings</h1>

			<div className='flex items-start justify-between w-full border-t mt-2 py-4 px-4'>
				<form
					onSubmit={handleSubmit}
					className='w-[55%] flex flex-col space-y-3'
				>
					<div className='space-y-1'>
						<p className='text-sm'>Name</p>
						<FormTextInput
							name='name'
							padding='py-3 px-4'
							disabled={loading}
							value={formData.name}
							handleChange={handleChange}
							placeHolder='Name'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>
					<div className='space-y-1'>
						<p className='text-sm'>Location</p>
						<FormTextInput
							name='location'
							padding='py-3 px-4'
							disabled={loading}
							value={formData.location!}
							handleChange={handleChange}
							placeHolder='Location'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>
					<div className='space-y-1'>
						<p className='text-sm'>Address</p>
						<FormTextInput
							name='address'
							padding='py-3 px-4'
							disabled={loading}
							value={formData.address}
							handleChange={handleChange}
							placeHolder='Address'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>
					<div className='space-y-1'>
						<p className='text-sm'>Email</p>
						<FormTextInput
							name='email'
							padding='py-3 px-4'
							disabled={loading}
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
							disabled={loading}
							value={formData.phoneNumber}
							handleChange={handleChange}
							placeHolder='Phone Number'
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					{loading ? (
						<Button
							disabled
							type='button'
							className='bg-green-500 text-white text-sm hover:bg-green-600 hover:text-white w-fit px-3 rounded'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='submit'
							className='bg-green-500 text-white text-sm hover:bg-green-600 hover:text-white w-fit px-3 rounded'
						>
							Save Changes
						</Button>
					)}
				</form>

				<div
					// onSubmit={handleAvatarSubmit}
					className='flex flex-col items-center justify-center space-y-3 w-[45%]'
				>
					<div className='h-[150px] w-[150px] rounded-full border relative'>
						<Image
							alt='image'
							// width={150}
							// height={150}
							fill
							// src={'/user__1.svg'}
							className='object-cover rounded-full h-full w-full'
							src={
								formData.avatarUrl
									? formData.avatarUrl
									: '/vendor.jpg'
							}
						/>
					</div>

					<input
						type='file'
						name='avatar'
						ref={avatarRef}
						accept='.jpeg, .jpg'
						style={{display: 'none'}}
						onChange={handleMediaUpload}
					/>

					<Button
						type='button'
						onClick={() => avatarRef.current?.click()}
						className='border border-green-500 text-[10px] bg-white hover:bg-white text-green-500 hover:border-green-600 hover:text-green-600 w-[100px] px-3 rounded'
					>
						Choose Image
					</Button>
				</div>
			</div>
		</div>
	);
};

export default VendorSettings;
