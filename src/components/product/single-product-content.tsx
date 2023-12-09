'use client';
import Image from 'next/image';
import {cn} from '@/lib/utils';
import {
	useGlobalStore,
	useProductMediaModalStore,
} from '@/hooks/use-global-store';
import {Badge} from '../ui/badge';
import {Button} from '../ui/button';
import {
	AlertDialog,
	AlertDialogTitle,
	AlertDialogCancel,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogTrigger,
	AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import {usePathname} from 'next/navigation';
import ProductCard from '../cards/product-card';
import {Product, ProductInfo} from '@/types/types';
import React, {Dispatch, SetStateAction} from 'react';
import {PriceFormatter} from '@/utils/price.formatter';
import SellerInfoTab from '../product-info/seller-info-tab';
import SellerProductCard from '../cards/seller-product-card';
import ProductReviewTab from '../product-info/product-review-tab';
import MoreFromSellerTab from '../product-info/more-from-seller-tab';
import {FlagTriangleRight, ThumbsDown, ThumbsUp} from 'lucide-react';
import MarketPlaceProductCard from '../cards/marketplace-product-card';

interface SingleProductContentProps {
	currentTab: Tab;
	loading: boolean;
	product: Product;
	productInfo: ProductInfo | null;
	handleAddToDesiredProducts: () => void;
	setCurrentTab: Dispatch<SetStateAction<Tab>>;
	handleLikeUnlikeProduct: (formData: {value?: boolean}) => void;
}

type Tab = 'Seller Info' | 'Review' | 'More From Seller';
const CurrentTabs: Tab[] = ['Seller Info', 'Review', 'More From Seller'];

const SingleProductContent = ({
	loading,
	product,
	currentTab,
	productInfo,
	setCurrentTab,
	handleLikeUnlikeProduct,
	handleAddToDesiredProducts,
}: SingleProductContentProps) => {
	const pathName = usePathname();

	const {user, products} = useGlobalStore();

	const isProductMediaModalOpen = useProductMediaModalStore(
		(state) => state.isOpen
	);
	const onProductMediaModalOpen = useProductMediaModalStore(
		(state) => state.onOpen
	);
	const updateProductModalPayload = useProductMediaModalStore(
		(state) => state.updatePayload
	);

	return (
		<div className='flex flex-col justify-start items-start py-10 md:px-8'>
			<h1 className='text-orange-500 text-3xl font-medium mb-4'>
				{product?.name}
			</h1>

			<div className='flex flex-wrap justify-between items-start md:h-[500px] w-full'>
				<div className='w-full md:w-[55%] h-[350px] md:h-full relative mb-5 md:mb-0 md:rounded-l-l'>
					<Image
						fill
						alt={'product'}
						src={product?.media[0]?.mediaUrl!}
						className='object-fill h-full w-full md:rounded-l-l border border-gray-600'
					/>

					{user && (
						<div className='absolute bottom-0 right-0'>
							<Button
								type='button'
								onClick={() => {
									if (loading) return;

									const formData: {value?: boolean} = {};
									if (
										product?.likedUsers?.includes(user?.id!)
									) {
										formData.value = false;
									} else {
										formData.value = true;
									}

									handleLikeUnlikeProduct(formData);
								}}
								variant={'outline'}
								className='bg-main border-0 text-white hover:bg-main hover:text-white text-xs h-10 py-4 flex items-center space-x-3 rounded-none'
							>
								{product?.likedUsers?.includes(user?.id!) ? (
									<>
										{' '}
										<ThumbsDown className='h-3 md:h-4 w-3 md:w-4 text-white' />{' '}
										<span>Unlike Product</span>
									</>
								) : (
									<>
										<ThumbsUp className='h-3 md:h-4 w-3 md:w-4 text-white' />{' '}
										<span>Like Product</span>
									</>
								)}
							</Button>
						</div>
					)}
				</div>
				<div className='w-full md:w-[40%] flex flex-col justify-between md:h-full px-4 md:px-0'>
					<div className='flex flex-col justify-between border border-slate-500 md:rounded-tr-lg p-4'>
						<div className='flex items-center justify-between w-full'>
							<h1 className='text-sm font-medium'>
								{product.isNegotiable &&
									PriceFormatter(product?.discountPrice!)}
								{product.isNegotiable && ' - '}
								{PriceFormatter(product?.price!)}
							</h1>

							{product?.isNegotiable && (
								<Badge className='text-[10px]'>
									Negotiable
								</Badge>
							)}
						</div>

						<div className='flex items-center space-x-3 py-3'>
							<Image
								width={60}
								height={60}
								alt={productInfo?.name!}
								src={productInfo?.avatar ?? '/icon__user.svg'}
								// src={'/icon__user.svg'}
								className='rounded-full border object-fill'
							/>

							<div className='flex flex-col space-y-3'>
								<p className='text-sm font-medium'>
									{productInfo?.name! ?? ''}
								</p>
								<p className='text-[10px] px-2 py-1 text-center bg-gray-200 rounded-md'>
									{productInfo?.name && 'Replies in 2 days'}
								</p>
							</div>
						</div>

						<div className='flex flex-wrap items-center mt-3 gap-5 justify-between'>
							<Button
								type='button'
								variant={'outline'}
								onClick={handleAddToDesiredProducts}
								className='bg-main text-white hover:bg-main hover:text-white text-[10px] md:text-xs h-10 w-[45%] rounded-full py-2'
							>
								Add to Desired Product
							</Button>

							<Button
								type='button'
								variant={'outline'}
								onClick={() => {
									const chatLink = `https://wa.me/+234${productInfo?.phoneNumber}`;

									window.open(chatLink, '_blank');
								}}
								className='border-main text-main text-[10px] md:text-xs h-10 w-[45%] rounded-full py-2'
							>
								Chat with Seller
							</Button>

							<ProductContactAlertDialog
								productInfo={productInfo}
							/>
							{/* 
								<Button
									type='button'
									variant={'outline'}
									className='border-main text-main text-[10px] md:text-xs h-10 w-[45%] rounded-full py-2'
								>
									Show contact
								</Button> */}

							<Button
								type='button'
								variant={'outline'}
								className='flex items-center space-x-3 border-red-500 text-red-500 text-[10px] md:text-xs h-10 w-[45%] rounded-full py-2'
							>
								<p>Report</p>{' '}
								<FlagTriangleRight className='h-4 w-4 text-red-500' />
							</Button>
						</div>
					</div>

					<div className='flex flex-col space-y-3 h-ful md:h-fi border border-slate-500 p-4 mt-5 md:mt-0 rounded-br-lg'>
						<h1 className='text-sm font-medium'>Safety Tips</h1>

						<ul className='text-xs list-disc pl-3 space-y-5'>
							<li>
								If you wish to meet a seller, meet in a place
								where there are other people around and where
								you can easily leave if you feel uncomfortable.
							</li>
							<li>
								Be wary of sellers who ask for money upfront.
							</li>
							<li>
								Make sure the goods are what you expected and
								that they are in satisfactory condition before
								you pay anything.
							</li>
							<li>
								Review any paperwork carefully and don't pay
								until you are satisfied.
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className='mt-10 px-4 md:px-0'>
				<h1 className='font-medium text-xl'>Description</h1>
				<p>{product?.description}</p>
			</div>

			<div className='mt-5 w-full px-4 md:px-0'>
				<h1 className='font-medium text-xl'>Images</h1>

				<div className='grid grid-cols-2 gap-5 md:gap-5 md:flex items-center justify-start w-full rounded-lg'>
					{product?.media
						?.filter((media) => media.mediaType === 'IMAGE')
						?.slice(0, 6)
						?.map((media, index) => (
							<div
								key={media.id}
								className='h-[150px] md:h-[150px] w-full md:w-[150px] relative'
							>
								<Image
									fill
									alt={'product'}
									src={media.mediaUrl}
									onClick={() => {
										if (!isProductMediaModalOpen) {
											onProductMediaModalOpen();

											updateProductModalPayload(
												product.media
											);
										}
									}}
									className='rounded-g h-full w-full cursor-pointer'
								/>

								{index === 5 && (
									<div
										onClick={() => {
											if (!isProductMediaModalOpen) {
												onProductMediaModalOpen();

												updateProductModalPayload(
													product.media
												);
											}
										}}
										className='absolute top-0 h-full w-full bg-[#11111190] flex items-center justify-center rounded-lg cursor-pointer'
									>
										<p className='text-xs text-center text-white'>
											See more images
										</p>
									</div>
								)}
							</div>
						))}
				</div>
			</div>

			<div className='mt-5 px-4 md:px-0'>
				<h1 className='font-medium text-xl'>Videos</h1>

				<div className='grid grid-cols-2 gap-5 md:gap-5 md:flex items-center justify-start w-full rounded-lg px-4 md:px-0'>
					{product?.media
						?.filter((media) => media.mediaType === 'VIDEO')
						?.map((media, index) => (
							<div className='h-[250px] w-[45%] relative'>
								<video
									controls
									src={media.mediaUrl}
									className='object-cover h-full w-full'
								/>
							</div>
						))}
				</div>
			</div>

			<div className='flex items-center justify-between w-full mt-10 border-b border-b-orange-500 px-4 md:px-0'>
				{CurrentTabs.map((item) => (
					<div
						key={item}
						onClick={() => {
							setCurrentTab(item);
						}}
						className={cn(
							`py-4 text-center text-xs md:text-base w-1/3 rounded-t-lg cursor-pointer`,
							item === currentTab
								? 'bg-gradient-to-b from-orange-500 to-orange-50'
								: 'bg-white'
						)}
					>
						{item}
					</div>
				))}
			</div>

			<div className='w-full pb-5 px-4 md:px-0'>
				{currentTab === 'Seller Info' && <SellerInfoTab />}
				{currentTab === 'Review' && <ProductReviewTab />}
				{currentTab === 'More From Seller' && <MoreFromSellerTab />}
			</div>

			<div className='flex flex-col space-y-5 w-full px-4 md:px-0'>
				<div className='w-full bg-slate-200 text-centr py-4 pl-5 font-semibold'>
					Related Products
				</div>

				<div className='flex flex-wrap items-center justify-between w-full gap-y-4 md:gap-6 mt-10'>
					{/* <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-full'> */}
					{products
						?.filter((prd) => prd.id !== product?.id)
						?.slice(0, 10)
						.map((product) => {
							if (!pathName.includes('marketplace')) {
								return (
									<ProductCard
										key={product.id}
										product={product}
									/>
								);
							}
							if (pathName.includes('marketplace')) {
								return (
									<MarketPlaceProductCard
										key={product.id}
										product={product}
									/>
								);
							}
							if (pathName.includes('sellers')) {
								return (
									<SellerProductCard
										key={product.id}
										product={product}
									/>
								);
							}
						})}
				</div>
			</div>
		</div>
	);
};

export default SingleProductContent;

const ProductContactAlertDialog = ({
	productInfo,
}: {
	productInfo: ProductInfo | null;
}) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger className='border border-main text-main text-xs h-10 w-[45%] rounded-full py-2'>
				Show Contact
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{productInfo?.name!}</AlertDialogTitle>
					<AlertDialogDescription className='flex flex-col py-5 text-black'>
						<div className='relative w-[150px] h-[150px] mx-auto border'>
							<Image
								fill
								alt=''
								src={productInfo?.avatar!}
								className='object-fill w-full h-full'
							/>
						</div>
						<div className='grid grid-cols-2 gap-y-5 pt-2'>
							<p className='font-medium text-sm'>Email</p>
							<p>{productInfo?.email}</p>
							<p className='font-medium text-sm'>
								Contact number
							</p>
							<p>{productInfo?.phoneNumber}</p>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Close</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
