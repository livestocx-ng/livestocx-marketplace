'use client';
import {Search} from 'lucide-react';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import React, {useEffect, useReducer, useState} from 'react';
import {useGlobalStore} from '@/hooks/use-global-store';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';
import ProductCard from '@/components/cards/product-card';
import {NigeriaStates} from '@/data';
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

	const {searchProducts, updateVendors, updateProducts, updatePagination} =
		useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				query: event.target.value,
			},
		});
	};

	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				location: event.target.value,
			},
		});
	};

	const handleSearch = async () => {
		try {
			setLoading(true);

			if (!pathName.includes('sellers')) {
				const {data} = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/products/search?query=${formData.query}&location=${formData.location}`
				);

				// console.log('[DATA] ::  ', data);
				// updateSearchProducts(data.data.products);

				updateProducts(data.data.products);
				updatePagination(data.data.totalPages, data.data.hasNext);

				setLoading(false);
			} else {
				const {data} = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/search-sellers?query=${formData.query}&location=${formData.location}`
				);

				// console.log('[DATA] ::  ', data);
				// updateSearchProducts(data.data.vendors);

				updateVendors(data.data.vendors);
				updatePagination(data.data.totalPages, data.data.hasNext);

				setLoading(false);
			}
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	const fetchProducts = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/recommended/fetch-all`
			);

			// console.log('[DATA] ::  ', data);

			updateProducts(data.data.products);
			updatePagination(data.data.totalPages, data.data.hasNext);
		} catch (error) {
			const _error = error as AxiosError;

			console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	const fetchSellers = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/fetch-all?page=1`
			);

			// console.log('[DATA] ::  ', data);

			updateVendors(data.data.vendors);
			updatePagination(data.data.totalPages, data.data.hasNext);
		} catch (error) {
			const _error = error as AxiosError;

			console.log('[SEARCH-PRODUCTS-ERROR] :: ', _error);
		}
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
		if (formData.query.length > 2 || formData.location) {
			handleSearch();
		}
	}, [formData.query, formData.location]);

	return (
		<div className='w-full'>
			<div className='flex flex-col md:flex-row w-full justify-center items-center gap-x-5 relative'>
				<FormTextInput
					name='query'
					value={formData.query}
					handleChange={handleChange}
					placeHolder='What are you looking for?'
					classes='w-[85%] md:w-[60%] bg-[#00A65120] text-white text-sm placeholder:text-sm placeholder:italic border-2 border-green-600 focus:border-green-600 rounded-full'
				/>

				<div className='w-[85%] mt-4 md:mt-0 md:w-fit'>
					<select
						name='location'
						className='w-full py-4 rounded-full bg-main px-3 text-sm text-white outline-none scrollbar__1'
						onChange={handleSelectChange}
					>
						<option value=''>
							{formData.location ? formData.location : 'Location'}
						</option>
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
	);
};

export default SearchForm;
