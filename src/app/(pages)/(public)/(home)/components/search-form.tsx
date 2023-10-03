'use client'
import React, { useReducer } from 'react'
import {Search} from 'lucide-react';
import {Button} from '@/components/ui/button';
import FormTextInput from '@/components/input/form-input';

const SearchForm = () => {
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

		console.log('[PAYLOAD] :: ');
	};

  return (
<form className='w-full' onSubmit={handleSearch}>
					<div className='flex w-full justify-center items-center gap-x-5'>
						<FormTextInput
							name='search'
							value={formData.search}
							handleChange={handleChange}
							placeHolder='What are you looking for?'
							classes='w-[60%] bg-transparent text-white text-sm placeholder:text-sm placeholder:italic border-2 border-green-600 focus:border-green-600 rounded-full'
						/>

						<Button className='bg-main rounded-full w-12 h-12'>
							<Search className='h-12 w-12 text-white' />
						</Button>
					</div>
				</form>
  )
}

export default SearchForm