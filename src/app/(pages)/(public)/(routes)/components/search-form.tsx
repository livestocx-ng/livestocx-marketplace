'use client';
import {MapPin, Search} from 'lucide-react';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import React, {useEffect, useReducer, useState} from 'react';
import {
	useGlobalStore,
	useUpdateSearchLocationModalStore,
} from '@/hooks/use-global-store';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';
import ProductCard from '@/components/cards/product-card';
import {NigerianStates} from '@/data';
import {usePathname} from 'next/navigation';

type FormData = {
	query: string;
	location: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	query: '',
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

const SearchForm = () => {
	const pathName = usePathname();

	const {searchLocation, updateVendors, updateProducts, updatePagination} =
		useGlobalStore();

	const updateSearchLocationModal = useUpdateSearchLocationModalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const fetchProducts = async () => {
		try {
			if (pathName.split('/')[1] === '') {
				const {data} = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/products/recommended/fetch-all`
				);

				updateProducts(data.data.products);
				updatePagination(data.data.totalPages, data.data.hasNext);
			} else {
				const {data} = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/products/fetch-location-products?location=${searchLocation}&query=$page=1`
				);

				updateProducts(data.data.products);
				updatePagination(data.data.totalPages, data.data.hasNext);
			}
			// // console.log('[DATA] ::  ', data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	const fetchSellers = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/fetch-all?page=1`
			);

			// // console.log('[DATA] ::  ', data);

			updateVendors(data.data.vendors);
			updatePagination(data.data.totalPages, data.data.hasNext);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[SEARCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	const handleSearch = async () => {
		try {
			setLoading(true);

			if (!pathName.includes('sellers')) {
				const {data} = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/products/search?query=${formData.query}&location=${formData.location}`
				);

				// // console.log('[DATA] ::  ', data);
				// updateSearchProducts(data.data.products);

				updateProducts(data.data.products);
				updatePagination(data.data.totalPages, data.data.hasNext);

				setLoading(false);
			} else {
				const {data} = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/search-sellers?query=${formData.query}&location=${formData.location}`
				);

				// // console.log('[DATA] ::  ', data);
				// updateSearchProducts(data.data.vendors);

				updateVendors(data.data.vendors);
				updatePagination(data.data.totalPages, data.data.hasNext);

				setLoading(false);
			}
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				query: event.target.value,
			},
		});
	};

	useEffect(() => {
		if (formData.query === '' && !pathName.includes('sellers')) {
			fetchProducts();
		}
		if (formData.query === '' && pathName.includes('sellers')) {
			fetchSellers();
		}
	}, [formData.query]);

	useEffect(() => {
		if (formData.query.trim().length > 2 || formData.location) {
			handleSearch();
		}
	}, [formData.query, formData.location]);

	return (
		<div className='w-full flex flex-col justify-center items-center'>
			<div className='text-white text-sm flex items-center space-x-2 py-2'>
				Find anything Livestocx in{' '}
				<p
					onClick={() => updateSearchLocationModal.onOpen()}
					className='bg-slate-800 cursor-pointer text-white px-4 pl-2 py-2 flex items-center capitalize'
				>
					&nbsp;
					<MapPin className='h-5 w-5' /> {searchLocation}
				</p>
			</div>
			<div className='flex w-full justify-center items-center gap-x-5 relative'>
				<FormTextInput
					name='query'
					value={formData.query}
					handleChange={handleChange}
					placeHolder='What are you looking for?'
					classes='w-[70%] md:w-[60%] bg-[#00A65120] text-white text-sm placeholder:text-sm placeholder:italic border-2 border-green-600 focus:border-green-600 rounded-full'
				/>

				{/* <div className='w-[85%] mt-4 md:mt-0 md:w-fit'>
					<select
						name='location'
						className='w-full py-4 rounded-full bg-main px-3 text-sm text-white outline-none scrollbar__1'
						onChange={handleSelectChange}
					>
						<option value=''>
							{formData.location ? formData.location : 'Location'}
						</option>
						{NigerianStates.map((option) => (
							<option
								key={option}
								value={option}
								className='cursor-pointer'
							>
								{option}
							</option>
						))}
					</select>
				</div> */}
				{loading ? (
					<Button
						type='button'
						className='bg-main hover:bg-main rounded-full w-12 h-12'
					>
						<ButtonLoader />
					</Button>
				) : (
					<Button
						type='button'
						onClick={handleSearch}
						className='bg-main hover:bg-main rounded-full w-12 h-12'
					>
						<Search className='h-12 w-12 text-white' />
					</Button>
				)}
			</div>
		</div>
	);
};

export default SearchForm;
