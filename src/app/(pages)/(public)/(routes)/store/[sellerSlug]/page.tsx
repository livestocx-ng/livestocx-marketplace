'use client';
import Lottie from 'lottie-react';
import axios, {AxiosError} from 'axios';
import SellerFooter from './components/seller-footer';
import SellerBanner from './components/seller-banner';
import {useGlobalStore} from '@/hooks/use-global-store';
import PageBanner from '@/components/banner/page-banner';
import React, {Fragment, useEffect, useState} from 'react';
import MainNavbar from '@/components/navigation/main-nav-bar';
import SellerInfoSearchForm from './components/seller-search-form';
import SellerInfoProducts from './components/seller-info-products';
import LoadingAnimationOne from '@/components/loader/loading-animation-one';
import LoadingAnimation from '../../../../../../../public/animations/animation__3.json';
import DisabledAccountAnimation from '../../../../../../../public/animations/animation__4.json';

interface SellerInfoPageProps {
	params: {
		sellerSlug: string;
	};
}

const SellerInfoPage = ({params}: SellerInfoPageProps) => {
	const {
		user,
		vendorProfile,
		updateVendorProfile,
		updateSellerPagination,
		updateSellerProducts,
	} = useGlobalStore();

	const [loading, setLoading] = useState<boolean>(true);
	const [currentPage, setCurrentPage] = useState<number>(1);

	const fetchSeller = async () => {
		try {
			setLoading(true);

			// const {data} = await axios.get(
			// 	`${
			// 		process.env.NEXT_PUBLIC_API_URL
			// 	}/user/sellers/${getVendorIdFromSlug(params.sellerSlug)}`
			// );

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/profile?slug=${params.sellerSlug}`
			);

			updateVendorProfile(data.data);

			// console.log('[VENDOR-PROFILE] :: ', data.data);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;

			// console.log('[FETCH-SELLERS-ERROR] :: ', _error);
		}
	};

	const fetchSellerProducts = async () => {
		try {
			setLoading(true);

			// const {data} = await axios.get(
			// 	`${
			// 		process.env.NEXT_PUBLIC_API_URL
			// 	}/user/sellers/${getVendorIdFromSlug(
			// 		params.sellerSlug
			// 	)}/products?page=${currentPage}`
			// );
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/profile/products?slug=${params.sellerSlug}&page=${currentPage}`
			);

			// // console.log('[DATA] ::  ', profile.data);
			// console.log('[DATA] ::  ', products.data);

			updateSellerProducts(data.data.products);
			updateSellerPagination(data.data.totalPages, data.data.hasNext);

			setLoading(false);
		} catch (error) {
			setLoading(false);
			const _error = error as AxiosError;

			// console.log('[FETCH-SELLERS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchSeller();
	}, []);

	useEffect(() => {
		fetchSellerProducts();
	}, [currentPage]);

	return (
		<Fragment>
			<MainNavbar />
			<main className='bg-[#28312B]'>
				<section className='h-[20vh] md:h-[220px] w-full bg-home flex flex-col items-center justify-center'>
					<h1
						className={`text-base md:text-3xl font-medium text-white text-center`}
					>
						{vendorProfile?.name}
					</h1>
				</section>

				{loading && (
					<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center'>
						{/* <div className='h-[400px] w-1/2 mx-auto'>
							<Lottie
								loop={true}
								className='h-full'
								animationData={LoadingAnimation}
							/>
						</div> */}
						<LoadingAnimationOne />
					</div>
				)}

				{!loading && vendorProfile && (
					<div className='flex flex-col w-full bg-white px-4 md:px-8 py-5 space-y-2 sm:space-y-5'>
						<SellerBanner />

						<div className='relative'>
							{vendorProfile?.isAccountDisabled === true && (
								<div className='absolute top-0 left-0 h-full w-full bg-[#ffffff90] backdrop-blur-md z-[5] flex flex-col items-center justify-center'>
									<p className='text-center text-sm sm:text-lg font-medium'>
										{vendorProfile?.isAccountDisabled &&
										vendorProfile?.user === user?.id
											? 'Your account has been disabled, subscribe to allow your customers view your products.'
											: 'This account is disabled!'}
									</p>
								</div>
							)}

							<div className='flex items-center justify-between w-full'>
								<SellerInfoSearchForm />
							</div>

							<PageBanner text={`Our Products`} />

							<SellerInfoProducts
								currentPage={currentPage}
								updateCurrentPage={setCurrentPage}
							/>
						</div>
					</div>
				)}
			</main>
			<SellerFooter />
		</Fragment>
	);
};

export default SellerInfoPage;
