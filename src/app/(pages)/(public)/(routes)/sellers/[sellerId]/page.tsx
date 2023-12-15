'use client';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import SearchForm from '../../components/search-form';
import SellerBanner from './components/seller-banner';
import PageBanner from '@/components/banner/page-banner';
import {useGlobalStore} from '@/hooks/use-global-store';
import SellerInfoSearchForm from './components/seller-search-form';
import SellerInfoProducts from './components/seller-info-products';
import LoadingAnimation from '../../../../../../../public/animations/loading__animation__1.json';

interface SellerInfoPageProps {
	params: {
		sellerId: string;
	};
}

const SellerInfoPage = ({params}: SellerInfoPageProps) => {
	const {
		vendor,
		updateVendor,
		sellerProducts,
		updateSellerPagination,
		updateSellerProducts,
	} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(1);

	// console.log('[PARAMS] :: ', params);
	// console.log('[VENDOR] :: ', vendor);

	const fetchSeller = async () => {
		try {
			setLoading(true);

			const [profile, products] = await Promise.all([
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/${params.sellerId}`
				),
				axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/${params.sellerId}/products?page=${currentPage}`
				),
			]);

			// console.log('[DATA] ::  ', profile.data);
			console.log('[DATA] ::  ', products.data);

			updateVendor(profile.data.data);
			updateSellerProducts(products.data.data.products);
			updateSellerPagination(
				products.data.data.totalPages,
				products.data.data.hasNext
			);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;

			console.log('[FETCH-SELLERS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchSeller();
	}, [currentPage]);

	return (
		<main className='bg-[#28312B]'>
			<section className='sm:h-[35vh] w-full bg-home flex flex-col items-center justify-center gap-y-16 pt-28 pb-20 sm:pb-0 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					{vendor?.name}
				</h1>

				{/* <SearchForm /> */}
			</section>

			{loading && (
				<div className='w-full bg-white h-[100vh] flex flex-col items-center justify-center'>
					<div className='h-[400px] w-1/2 mx-auto'>
						<Lottie
							loop={true}
							className='h-full'
							animationData={LoadingAnimation}
						/>
					</div>
				</div>
			)}

			{!loading && vendor && (
				<div className='flex flex-col w-full bg-white px-4 md:px-8 py-5 space-y-5'>
					<SellerBanner />

					{/* <PageBanner text='Products of Jigga Farms' /> */}

					<div className='flex items-center justify-between w-full'>
						<SellerInfoSearchForm />
					</div>

					<PageBanner
						text={`${sellerProducts?.length} Products Found`}
					/>

					<SellerInfoProducts
						currentPage={currentPage}
						updateCurrentPage={setCurrentPage}
					/>
				</div>
			)}
		</main>
	);
};

export default SellerInfoPage;
