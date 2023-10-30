'use client';

import FormTextInput from '@/components/input/form-text-input';
import {Button} from '@/components/ui/button';
import {Modal} from '@/components/ui/modal';
import {useModal} from '@/hooks/use-modal';
import {Plus, UploadCloud, X} from 'lucide-react';
import Image from 'next/image';
import {useReducer, useState} from 'react';
import FormTextAreaInput from '@/components/input/form-text-area-input';
import {CategoryDropDownButton} from './buttons/category-dropdown-button';
import {DropdownMenuCheckboxItemProps} from '@radix-ui/react-dropdown-menu';

type FormData = {
	price: string;
	productName: string;
	discountPrice: string;
	category: string;
	description: string;
	images: [];
	videos: [];
};

type FormAction = {
	type: 'UPDATE_FORMDATA' | 'UPDATE';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	productName: '',
	price: '',
	category: '',
	description: '',
	discountPrice: '',
	images: [],
	videos: [],
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

type Checked = DropdownMenuCheckboxItemProps['checked'];

const AddProductModal = () => {
	const modal = useModal();

	const [loading, setLoading] = useState<boolean>(false);
	const [category, setCategory] = useState<string>('cow');
	const [showStatusBar, setShowStatusBar] = useState<Checked>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};
	const handleTextAreaChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-10'>
			<div className='flex flex-col w-[60%] bg-white py-2 px-4'>
				<div className='flex items-center justify-between px4'>
					<h1>Add Product</h1>

					<Button
						type='button'
						onClick={() => modal.onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-black h-4 w-4' />
					</Button>
				</div>

				<div className='flex items-start justify-between w-full'>
					<div className='w-[30%] flex flex-col space-y-5'>
						<div className='w-full bg-slate-200 rounded flex flex-col items-center justify-center space-y-3 px-4 py-8'>
							<UploadCloud className='w-10 h-10' />
							<p className='text-center text-xs'>
								Upload picture of product
							</p>
						</div>

						<div className='flex items-start space-x-5'>
							<div className='p-3 border text-center'>
								<Plus className='text-black' />
							</div>
							<p className='text-xs'>
								Add more pictures and videos of product (minimum
								of 10 images and 2 videos)
							</p>
						</div>
					</div>

					<div className='w-[70%] flex flex-col space-y-3 pl-8'>
						<CategoryDropDownButton
							value={category}
							setValue={setCategory}
							setShowStatusBar={setShowStatusBar}
						/>
						
						<div className='space-y-'>
							<p className='text-xs'>Name</p>
							<FormTextInput
								name='productName'
								padding='py-3 px-4'
								value={formData.productName}
								handleChange={handleChange}
								placeHolder='Product name'
								classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 rounded'
							/>
						</div>
						<div className='flex items-center justify-between'>
							<div className='space-y- w-[45%]'>
								<p className='text-xs'>Price</p>
								<FormTextInput
									name='price'
									padding='py-3 px-4'
									value={formData.price}
									handleChange={handleChange}
									placeHolder='Price'
									classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 rounded'
								/>
							</div>
							<div className='space-y- w-[45%]'>
								<p className='text-xs'>Discount Price</p>
								<FormTextInput
									name='discountPrice'
									padding='py-3 px-4'
									handleChange={handleChange}
									placeHolder='Discount price'
									value={formData.discountPrice}
									classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 rounded'
								/>
							</div>
						</div>

						<div className='space-y- w-full'>
							<p className='text-xs'>Description</p>
							<FormTextAreaInput
								rows={8}
								name='description'
								handleChange={handleTextAreaChange}
								value={formData.description}
								placeHolder='Description'
								padding={'py-3 px-2'}
								classes='w-full text-xs placeholder:text-xs border focus:border-slate-500 rounded resize-none'
							/>
						</div>
					</div>
				</div>

				<div className='flex justify-end'>
					<Button
						type='submit'
						variant={'outline'}
						className='bg-main hover:bg-main text-xs h-12 text-white hover:text-white rounded-md py-3 px-8 -fit'
					>
						Submit
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AddProductModal;
