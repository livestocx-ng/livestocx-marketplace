'use client';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {FilterOptions} from '@/data';
import React, {useState} from 'react';
import {Button} from '@/components/ui/button';
import FormTextInput from '@/components/input/form-text-input';

const SellerInfoSearchForm = () => {
	const [search, setSearch] = useState<string>('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<div className='flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0'>
			<form onSubmit={handleSubmit} className='w-full sm:w-[60%]'>
				<FormTextInput
					name='email'
					value={search}
					padding='py-4 px-4 pl-6'
					placeHolder='Search...'
					handleChange={handleChange}
					classes='w-[80%] sm:w-[50%] text-sm placeholder:text-sm h-12 border-l border-t border-b focus:border-slate-500 rounded-r-none rounded-l-lg'
				/>
				<Button
					type='submit'
					variant={'outline'}
					className='border border-main bg-main hover:bg-main text-xs h-12 text-white hover:text-white rounded-l-none rounded-r-md py-3 w-[20%] sm:w-fit'
				>
					Search
				</Button>
			</form>

			<Select
				onValueChange={(value) => {
					// router.push(`/marketplace/${value}`);
				}}
			>
				<SelectTrigger className='w-full sm:w-[180px] py-4 h-12'>
					<SelectValue placeholder='Filter' />
				</SelectTrigger>
				<SelectContent className='bg-main'>
					<SelectGroup>
						{/* <SelectLabel className='text-white'>Filter</SelectLabel> */}
						{FilterOptions.slice(0, 4).map((option) => (
							<SelectItem
								key={option.id}
								value={option.value}
								className='text-white'
							>
								{option.title}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default SellerInfoSearchForm;
