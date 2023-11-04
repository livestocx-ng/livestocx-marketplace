'use client';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useRouter} from 'next/navigation';
import {useModal} from '@/hooks/use-modal';
import {Button} from '@/components/ui/button';
import {Plus, UploadCloud, X} from 'lucide-react';
import {useEffect, useReducer, useRef, useState} from 'react';
import {isFileSizeValid} from '@/utils/file.validation';
import FormTextInput from '@/components/input/form-text-input';
import FormTextAreaInput from '@/components/input/form-text-area-input';
import {CategoryDropDownButton} from './buttons/category-dropdown-button';
import {DropdownMenuCheckboxItemProps} from '@radix-ui/react-dropdown-menu';
import {ValidateCreateProductFormData} from '@/utils/form-validations/product.validation';
import ButtonLoader from '@/components/loader/button-loader';
import {createBlobImageUrls, getFilesTypeCount} from '@/utils/file.mutation';
import {useUserHook} from '@/hooks/use-user';
import {useDeleteProductModalStore} from '@/hooks/use-global-state';

export type FormData = {
	id: string;
	name: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA' | 'UPDATE';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	id: '',
	name: '',
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const DeleteProductModal = () => {
	const {user} = useUserHook();

	const {payload, onClose} = useDeleteProductModalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [productCategory, setProductCategory] = useState<string>('cow');
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	useEffect(() => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				id: payload.id,
				name: payload.name,
			},
		});
	}, [payload]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			const FormData = {
				...formData,
				productCategory: productCategory.toUpperCase(),
			};
			console.log('[DELETE-PRODUCT-PAYLOAD] :: ', FormData);

			const {data} = await axios.delete(
				`${process.env.NEXT_PUBLIC_API_URL}/products/delete?productId=${formData.id}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			console.log('[DATA] :: ', data);

			setLoading(false);

			toast.success('Product deleted');

			// close modal
			onClose();
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			console.log('[DELETE-PRODUCT-ERROR]', _error);

			toast.error('Error');
		}
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-10'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col w-[40%] bg-white py-2 px-4  overflow-y-auto scrollbar__1'
			>
				<div className='flex items-center justify-between px4'>
					<h1 className='text-red-500'>Delete Product</h1>

					<Button
						type='button'
						onClick={() => onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-black h-4 w-4' />
					</Button>
				</div>

				<div className='flex items-center justify-center w-full py-8'>
					<p>
						Are you sure you want to delete the "{formData.name}"
						product?
					</p>
				</div>

				<div className='flex justify-end'>
					{loading ? (
						<Button
							disabled
							type='button'
							variant={'outline'}
							className='bg-red-500 hover:bg-red-500 text-xs h-12 text-white hover:text-white rounded-none py-3 px-8 border-0'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='submit'
							variant={'outline'}
							className='bg-red-500 hover:bg-red-600 text-xs h-12 text-white hover:text-white rounded-none py-3 px-8 border-0'
						>
							Submit
						</Button>
					)}
				</div>
			</form>
		</div>
	);
};

export default DeleteProductModal;

const ImageToolTip = ({image}: {image: string}) => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<div className='h-[80px] w-[80px] relative'>
						<Image
							fill
							src={image}
							// width={40}
							// height={40}
							alt={'Blob'}
							className='object-cover h-full w-full'
						/>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<div className='h-[200px] w-[200px] relative'>
						<Image
							fill
							src={image}
							// width={40}
							// height={40}
							alt={'Blob'}
							className='object-cover h-full w-full'
						/>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

const VideoToolTip = ({file}: {file: File}) => {
	return (
		<div className='h-[180px] w-[45%]'>
			<video
				controls
				src={URL.createObjectURL(file)}
				className='object-cover h-full w-full'
			/>
		</div>
	);
};
