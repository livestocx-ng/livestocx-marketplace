'use client';
import {
	TwitterIcon,
	WhatsappIcon,
	FacebookIcon,
	TwitterShareButton,
	FacebookShareButton,
	WhatsappShareButton,
} from 'react-share';
import {
	Phone,
	Copy,
	Award,
	EyeIcon,
	ThumbsUp,
	BarChart3,
	ThumbsDown,
	FlagTriangleRight,
} from 'lucide-react';
import Link from 'next/link';
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
import {toast} from 'react-hot-toast';
import ProductCard from '../cards/product-card';
import {Product, ProductInfo} from '@/types/types';
import {PriceFormatter} from '@/utils/price.formatter';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {formatVendorSlug} from '@/utils/slug.formatter';
import {getMediaImageUrl} from '@/utils/media/media.url';
import SellerInfoTab from '../product-info/seller-info-tab';
import ProductReviewTab from '../product-info/product-review-tab';
import MoreFromSellerTab from '../product-info/more-from-seller-tab';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {likesViewsImpressionFormatter} from '@/utils/like.view.impression.formatter';

interface SingleProductContentProps {
	currentTab: Tab;
	loading: boolean;
	product: Product;
	productInfo: ProductInfo | null;
	handleAddUserToCallSeller: () => void;
	handleMessageSeller: () => void;
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
	handleMessageSeller,
	handleLikeUnlikeProduct,
	handleAddUserToCallSeller,
}: SingleProductContentProps) => {
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

	const [countdown, setCountdown] = useState<number>(86400); // 24 hours in seconds
	const [endTime, setEndTime] = useState<Date | null>(null);

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600)
			.toString()
			.padStart(2, '0');
		const minutes = Math.floor((seconds % 3600) / 60)
			.toString()
			.padStart(2, '0');
		const secs = (seconds % 60).toString().padStart(2, '0');

		return `${hours}:${minutes}:${secs}`;
	};

	// Load saved countdown from localStorage
	useEffect(() => {
		const savedEndTime = localStorage.getItem(
			'LVSX_PRODUCT_TIMER_END_TIME'
		);
		if (savedEndTime) {
			const endTimeDate = new Date(parseInt(savedEndTime));
			setEndTime(endTimeDate);
			const remainingTime = Math.floor(
				(endTimeDate.getTime() - Date.now()) / 1000
			);
			if (remainingTime > 0) {
				setCountdown(remainingTime);
			} else {
				restartCountdown();
			}
		} else {
			restartCountdown();
		}
	}, []);

	// Restart countdown function
	const restartCountdown = () => {
		const possibleDurations = [28800, 32400, 36000, 43200, 86400]; // Various durations in seconds
		const randomDuration =
			possibleDurations[
				Math.floor(Math.random() * possibleDurations.length)
			];
		const newEndTime = new Date(Date.now() + randomDuration * 1000);
		setEndTime(newEndTime);
		setCountdown(randomDuration);
		localStorage.setItem(
			'LVSX_PRODUCT_TIMER_END_TIME',
			newEndTime.getTime().toString()
		);
	};

	// Countdown timer
	useEffect(() => {
		const timer = setInterval(() => {
			if (endTime) {
				const remainingTime = Math.floor(
					(endTime.getTime() - Date.now()) / 1000
				);
				if (remainingTime <= 0) {
					restartCountdown();
				} else {
					setCountdown(remainingTime);
				}
			}
		}, 1000);

		return () => clearInterval(timer);
	}, [endTime]);

	return (
		<div className='flex flex-col justify-start items-start pt-0 md:pt-3 pb-10 md:px-8'>
			<div className='flex flex-wrap justify-between items-start md:h-[500px] w-full'>
				<div className='w-full md:w-[58%] h-[350px] md:h-full relative mb-10 md:mb-0 rounded-none md:rounded-l-l'>
					<Image
						fill
						alt={'product'}
						unoptimized={true}
						src={getMediaImageUrl(product)}
						className='object-cover h-full w-full md:rounded-tl-lg border-0 md:border border-gray-600'
					/>

					<div className='flex items-center absolute top-0 left-0'>
						{product?.isPromotion === true && (
							<div className='bg-green-600 px-4 py-2 md:rounded-tl-lg'>
								<Award className='text-white' size={16} />
							</div>
						)}
						{product?.isNegotiable === true && (
							<div
								className={`bg-slate-800 px-4 py-2 ${
									!product?.isPromotion && 'md:rounded-tl-lg'
								}`}
							>
								<p className='text-[10px] text-white'>
									Negotiable
								</p>
							</div>
						)}
					</div>
					{product?.inStock === false && (
						<div className='absolute top-0 right-0 bg-[#b21e1ec6] px-4 py-2'>
							<p className='text-[10px] text-white'>
								Out Of Stock
							</p>
						</div>
					)}

					<div className='absolute flex items-center bottom-0 left-0'>
						<p className='bg-slate-800 border-0 text-white hover:bg-slate-800 hover:text-white text-[10px] py-2 px-2 flex items-center'>
							Posted on: {product?.createdAt?.slice(0, 10)}
						</p>
					</div>

					<div className='absolute -bottom-8 left-0 bg-black border-t border-t-white h-6 flex items-center justify-between py-4 md:rounded-bl-lg'>
						<div className='text-white border-r border-r-white flex items-center space-x-1 px-4'>
							<p className='text-sm'>
								{likesViewsImpressionFormatter(
									product?.likeCount!
								)}{' '}
							</p>
							<ThumbsUp size={14} />
						</div>
						<div className='text-white border-r border-r-white flex items-center space-x-1 px-4'>
							<p className='text-sm'>
								{likesViewsImpressionFormatter(
									product.viewCount
								)}
							</p>
							<EyeIcon size={14} />
						</div>
						<div className='text-white flex items-center space-x-1 px-4'>
							<p className='text-sm'>
								{likesViewsImpressionFormatter(
									product.impressionCount
								)}
							</p>
							<BarChart3 size={14} />
						</div>
					</div>

					<div className='absolute flex items-center bottom-0 right-0'>
						{user && (
							<Button
								type='button'
								onClick={() => {
									if (loading) return;

									const formData: {value?: boolean} = {};
									if (
										product?.likedUsers?.includes(
											parseInt(user?.id!)
										)
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
								{product?.likedUsers?.includes(
									parseInt(user?.id!)
								) ? (
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
						)}
					</div>
				</div>

				<div className='w-full md:w-[40%] flex flex-col justify-between md:h-full px-4 md:px-0'>
					<div className='flex flex-col justify-between border border-slate-500 md:rounded-tr-lg p-4'>
						<h1 className='font-semibold'>{product.name}</h1>

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

						<p className='text-sm underline text-red-500 font-semibold'>
							Offer ends in {formatTime(countdown)}
						</p>

						<Link
							href={
								productInfo?.vendor?.slug.length! > 0
									? `/store/${formatVendorSlug(
											productInfo?.vendor!
									  )}`
									: '#'
							}
							className='flex items-center space-x-3 py-3 cursor-pointer'
						>
							<div className='h-[40px] w-[40px] relative'>
								<Image
									// width={40}
									// height={40}
									fill
									unoptimized={true}
									alt={productInfo?.name!}
									src={
										productInfo?.avatar ?? '/icon__user.svg'
									}
									className='rounded-full border object-fill'
								/>
							</div>

							<div className='flex flex-col space-y-3'>
								<p className='text-xs font-medium'>
									{productInfo?.name! ?? ''}
								</p>
							</div>
						</Link>

						<div className='flex flex-wrap items-center mt-3 gap-5 justify-between'>
							<Button
								type='button'
								variant={'outline'}
								onClick={handleMessageSeller}
								className='bg-main text-white hover:bg-main hover:text-white text-[10px] md:text-xs h-10 w-[45%] rounded-full py-2'
							>
								Chat with Seller
							</Button>
							<Button
								type='button'
								variant={'outline'}
								onClick={handleAddUserToCallSeller}
								className='bg-white text-main hover:bg-white hover:text-main border border-main text-[10px] md:text-xs h-10 w-[45%] rounded-full py-2'
							>
								Call Seller
							</Button>

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

					<div className='flex flex-col space-y-3 h-fl md:h-[50% border border-red-500 text-red-600 p-4 mt-5 md:mt-0 rounded-br-lg'>
						<h1 className='text-sm font-semibold'>Safety Tips</h1>

						<ul className='text-xs  list-disc pl-3 space-y-5'>
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

			<div className='mt-14 px-4 md:px-0 w-full flex space-x-5 items-center justify-start'>
				<h1 className='font-medium text-base'>Share on:</h1>
				<div className='flex space-x-2'>
					<WhatsappShareButton
						url={window.location.toString()}
						title='Check out this awesome product on Livestocx: '
					>
						<WhatsappIcon size={30} round />
					</WhatsappShareButton>
					<FacebookShareButton
						url={window.location.toString()}
						title='Check out this awesome product on Livestocx: '
					>
						<FacebookIcon size={30} round />
					</FacebookShareButton>
					<TwitterShareButton
						url={window.location.toString()}
						title='Check out this awesome product on Livestocx: '
					>
						<TwitterIcon size={30} round />
					</TwitterShareButton>

					<CopyToClipboard
						text={window.location.toString()}
						onCopy={(text: string, result: boolean) => {
							toast.success('Copied to clipboard');
						}}
					>
						<div className='rounded-full border border-slate-400 h-8 w-8 flex items-center justify-center cursor-pointer'>
							<Copy className='h-4 w-4' />
						</div>
					</CopyToClipboard>
				</div>
			</div>

			<div className='mt-5 px-4 md:px-0'>
				<h1 className='font-medium text-base'>Description</h1>
				<p className='text-sm'>{product?.description}</p>
			</div>

			{product?.media?.filter((media) => media.mediaType === 'IMAGE')
				.length > 0 && (
				<div className='mt-5 w-full px-4 md:px-0'>
					<h1 className='font-medium text-base'>Images</h1>

					<div className='grid grid-cols-2 gap-5 md:gap-5 md:flex items-center justify-start w-full rounded-lg'>
						{product?.media
							?.filter((media) => media.mediaType === 'IMAGE')
							?.slice(0, 6)
							?.map((media, index) => (
								<div
									key={media.id}
									className='h-[150px] md:h-[150px] w-full md:w-[150px] relative border border-slate-400'
								>
									<Image
										fill
										alt={'product'}
										unoptimized={true}
										src={media.mediaUrl}
										onClick={() => {
											if (!isProductMediaModalOpen) {
												onProductMediaModalOpen();

												updateProductModalPayload(
													product.media
												);
											}
										}}
										className='object-cover rounded-g h-full w-full cursor-pointer'
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
			)}

			{product?.media?.filter((media) => media.mediaType === 'VIDEO')
				.length > 0 && (
				<div className='mt-5 px-4 md:px-0 w-full'>
					<h1 className='font-medium text-base'>Videos</h1>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-5 md:flex items-center justify-start w-full rounded-lg'>
						{product?.media
							?.filter((media) => media.mediaType === 'VIDEO')
							?.map((media, index) => (
								<div
									key={index}
									className='h-[250px] w-full md:w-[25%] relative border border-slate-400'
								>
									<video
										controls
										src={media.mediaUrl}
										className='object-cover h-full w-full'
									/>
								</div>
							))}
					</div>
				</div>
			)}

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
						.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
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
								unoptimized={true}
								src={productInfo?.avatar!}
								className='object-cover w-full h-full'
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

const ContactVendorAlertDialog = ({
	productInfo,
}: {
	productInfo: ProductInfo | null;
}) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger className='border border-main text-main text-xs h-10 w-[45%] rounded-full py-2'>
				Chat With Seller
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Vendor Contact</AlertDialogTitle>
					<AlertDialogDescription className='flex flex-col items-center justify-center py-5 text-black'>
						<Button
							variant={'outline'}
							onClick={() => {
								const chatLink = `https://wa.me/+234${productInfo?.phoneNumber}`;

								window.open(chatLink, '_blank');
							}}
							className='bg-main border-0 text-white hover:bg-main hover:text-white text-xs h-10 py-4 flex items-center space-x-3 rounded-full'
						>
							<Phone className='h-6 w-6' />{' '}
							<p className='text-sm'>
								{productInfo?.phoneNumber}
							</p>
						</Button>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Close</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
