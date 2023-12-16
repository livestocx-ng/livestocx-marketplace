'use client';
import {Search} from 'lucide-react';
import axios, {AxiosError} from 'axios';
import {Button} from '@/components/ui/button';
import React, {useEffect, useReducer, useState} from 'react';
import {useGlobalStore} from '@/hooks/use-global-store';
import ButtonLoader from '@/components/loader/button-loader';
import FormTextInput from '@/components/input/form-text-input';
import ProductCard from '@/components/cards/product-card';

type FormData = {
	query: string;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	query: '',
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
	const {
		searchProducts,
		updateProducts,
		updatePagination,
		updateSearchProducts,
	} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {
				query: event.target.value,
			},
		});

		if (event.target.value === '' || event.target.value.length <= 2) {
			return;
		} else {
			setTimeout(() => {
				handleSearch();
			}, 800);
		}
	};

	const handleSearch = async () => {
		try {
			setLoading(true);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/products/search?query=${formData.query}`
			);

			// console.log('[DATA] ::  ', data);
			// updateSearchProducts(data.data.products);

			updateProducts(data.data.products);
			updatePagination(data.data.totalPages, data.data.hasNext);

			setLoading(false);
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

	useEffect(() => {
		if (formData.query === '') {
			// updateSearchProducts([]);
			fetchProducts();
		}
	}, [formData.query]);

	return (
		<div className='w-full'>
			<div className='flex w-full justify-center items-center gap-x-5 relative'>
				<FormTextInput
					name='query'
					value={formData.query}
					handleChange={handleChange}
					placeHolder='What are you looking for?'
					classes='w-[70%] sm:w-[60%] bg-[#00A65120] text-white text-sm placeholder:text-sm placeholder:italic border-2 border-green-600 focus:border-green-600 rounded-full'
				/>

				{/* {searchProducts?.length > 0 && (
					<div className="absolute z-[5] w-full top-14 mx-auto bg-[#11111180] backdrop-blur-sm h-screen">
					<div className='z-[6] mx-auto bg-white max-h-[650px] w-full sm:w-[50%] shadow-md border border-t-0 overflow-y-auto scrollbar__1 flex flex-wrap justify-evenly gap-y-2 gap-x-2 pt-4 pb-14 px-4 md:px-0'>
						{searchProducts?.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
					</div>
				)} */}

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
