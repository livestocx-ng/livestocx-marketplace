'use client';
import React, {useReducer, useState} from 'react';
import {Search} from 'lucide-react';
import {Button} from '@/components/ui/button';
import FormTextInput from '@/components/input/form-text-input';
import ButtonLoader from '@/components/loader/button-loader';

const SearchForm = () => {
	const [loading, setLoading] = useState<boolean>(false);

	const [formData, updateFormData] = useReducer(
		(prev: {}, next: any) => {
			return {...prev, ...next};
		},
		{
			search: '',
		}
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			[event.target.name]: event.target.value,
		});
	};

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// console.log('[PAYLOAD] :: ');
	};

	return (
		<form className='w-full' onSubmit={handleSearch}>
			<div className='flex w-full justify-center items-center gap-x-5'>
				<FormTextInput
					name='search'
					value={formData.search}
					handleChange={handleChange}
					placeHolder='What are you looking for?'
					classes='w-[70%] sm:w-[60%] bg-[#00A65120] text-white text-sm placeholder:text-sm placeholder:italic border-2 border-green-600 focus:border-green-600 rounded-full'
				/>

				{loading ? (
					<Button
						type='button'
						className='bg-main hover:bg-main rounded-full w-12 h-12'
					>
						<ButtonLoader />
					</Button>
				) : (
					<Button
						type='submit'
						className='bg-main hover:bg-main rounded-full w-12 h-12'
					>
						<Search className='h-12 w-12 text-white' />
					</Button>
				)}
			</div>
		</form>
	);
};

export default SearchForm;
