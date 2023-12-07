'use client';
import {useReducer, useState} from 'react';
import {X} from 'lucide-react';
import {
	useGlobalStore,
	useUpdateGoogleProfileModalStore,
} from '@/hooks/use-global-store';
import {NigeriaStates} from '@/data';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';
import { ValidateGoogleProfileFormData } from '@/utils/form-validations/auth.validation';

type FormData = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	location: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	firstName: '',
	lastName: '',
	phoneNumber: '',
	location: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const UpdateGoogleProfileModal = () => {
	const {user, updateUser} = useGlobalStore();

	const {onClose} = useUpdateGoogleProfileModalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

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

	const handleSubmit = async () => {
		try {
			setLoading(true);

            const validationError = ValidateGoogleProfileFormData(formData);

			if (validationError) {
				setLoading(false);
				return toast.error(validationError, {duration: 10000});
			}

			const {data} = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/auth/update-google-profile`,
				formData,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);
			const cookieUpdate = await axios.patch(
				'/api/auth/update-cookies',
				data.data
			);

			await updateUser(cookieUpdate.data);

			console.log('[DATA] :: ', data);

			setLoading(false);

			toast.success('Success');

			// close modal
			onClose();
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			console.log('[UPDATE-GOOGLE-PROFILE-ERROR]', _error);

			toast.error('Error');
		}
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-[15]'>
			<div className='flex flex-col w-[40%] bg-white py-2 px-4 rounded overflow-y-auto scrollbar__1'>
				<div className='flex items-center justify-between px4'>
					<h1 className='font-semibold'>Update Profile</h1>

					<Button
						type='button'
						onClick={() => {
							if (!user?.isProfileUpdated) return;

							onClose();
						}}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col space-y-2 w-full py-5'>
					<div className='w-full'>
						<p className='text-sm font-medium'>
							First Name <span className='text-red-500'>*</span>
						</p>
						<FormTextInput
							name='firstName'
							disabled={loading}
							padding='py-4 px-4'
							placeHolder='First Name'
							value={formData.firstName}
							handleChange={handleChange}
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					<div className='w-full'>
						<p className='text-sm font-medium'>
							Last Name <span className='text-red-500'>*</span>
						</p>
						<FormTextInput
							name='lastName'
							disabled={loading}
							padding='py-4 px-4'
							placeHolder='Last Name'
							value={formData.lastName}
							handleChange={handleChange}
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					<div className='w-full'>
						<p className='text-sm font-medium'>
							Phone Number <span className='text-red-500'>*</span>
						</p>
						<FormTextInput
							type='text'
							name='phoneNumber'
							padding='py-3 px-4'
							disabled={loading}
							placeHolder='Phone Number'
							value={formData.phoneNumber}
							handleChange={handleChange}
							classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
						/>
					</div>

					<div className='w-full'>
						<p className='text-sm font-medium'>
							Location <span className='text-red-500'>*</span>
						</p>
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
					</div>
				</div>

				<div className='flex justify-end'>
					{loading ? (
						<Button
							// disabled
							type='button'
							variant={'outline'}
							className='w-[200px] bg-main hover:bg-main text-xs h-12 text-white hover:text-white rounded py-3 px-8 border-0'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='button'
							variant={'outline'}
							onClick={handleSubmit}
							className='w-[200px] bg-main hover:bg-main text-xs h-12 text-white hover:text-white rounded py-3 px-8 border-0'
						>
							Submit
						</Button>
					)}
				</div>
			</div>
		</div>
	);
};

export default UpdateGoogleProfileModal;
