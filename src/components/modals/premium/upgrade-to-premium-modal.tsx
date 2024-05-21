'use client';
import {X} from 'lucide-react';
import {
	useGlobalStore,
	useUpgradeToPremiumAccessStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useReducer, useState} from 'react';
import {Button} from '@/components/ui/button';
import ButtonLoader from '@/components/loader/button-loader';

type FormData = {
	name: string;
	email: string;
	phoneNumber: string;
	address: string;
	state: string;
	city: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	name: '',
	email: '',
	phoneNumber: '',
	address: '',
	state: 'Abia',
	city: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const UpgradeToPremiumModal = () => {
	const {user, vendor, updateUser, updateVendor} = useGlobalStore();

	const {onClose} = useUpgradeToPremiumAccessStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleSubmit = async () => {
		try {
			setLoading(true);

			setLoading(false);

			toast.success('Success');

			// close modal
			onClose();
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			toast.error('An error occurred.');
		}
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-[15]'>
			<div className='flex flex-col w-[90%] md:w-[90%] bg-white pb-2 overflow-y-auto scrollbar__1 border border-slate-200 rounded-sm'>
				<div className='flex items-center justify-between py-3 border-b w-full px-4'>
					<h1 className='font-medium'>Upgrade your plan</h1>

					<Button
						type='button'
						onClick={() => {
							onClose();
						}}
						className='bg-white hover:bg-white'
					>
						<X className='text-slate-600 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col space-y-2 w-full py-5'></div>
			</div>
		</div>
	);
};

export default UpgradeToPremiumModal;
