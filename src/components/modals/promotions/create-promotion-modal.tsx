'use client';
import Image from 'next/image';
import {X} from 'lucide-react';
import {
	useGlobalStore,
	useCreatePromotionModalStore,
} from '@/hooks/use-global-store';
import {toast} from 'react-hot-toast';
import axios, {AxiosError} from 'axios';
import {useEffect, useState} from 'react';
import {useUserHook} from '@/hooks/use-user';
import {Button} from '@/components/ui/button';
import {PriceFormatter} from '@/utils/price.formatter';
import {getMediaImageUrl} from '@/utils/media/media.url';
import ButtonLoader from '@/components/loader/button-loader';

const CreatePromotionModal = () => {
	const {user} = useUserHook();
	const {
		userPromotionPlan,
		promotionProducts,
		updatePromotionProducts,
		updatePromotionProductsPagination,
	} = useGlobalStore();

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [productIds, setProductIds] = useState<number[]>([]);

	const modal = useCreatePromotionModalStore();

	const [loading, setLoading] = useState<boolean>(false);

	const fetchPromotionProducts = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/promotions/user-products?page=${currentPage}`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			updatePromotionProductsPagination(
				data.data.totalPages,
				data.data.hasNext
			);
			updatePromotionProducts(data.data.products);
		} catch (error) {
			const _error = error as AxiosError;
		}
	};

	useEffect(() => {
		fetchPromotionProducts();
	}, []);

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		productId: string
	) => {
		if (userPromotionPlan?.plan_info.product_count === productIds.length) {
			return toast.error(
				`Sorry, your current plan only allows you to promote only ${userPromotionPlan?.plan_info.product_count} product(s)`
			);
		}

		if (event.target.checked) {
			setProductIds([...productIds, parseInt(productId)]);
		} else {
			setProductIds(
				productIds.filter((id) => id !== parseInt(productId))
			);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			modal.onClose();
			setLoading(false);
		} catch (error) {
			setLoading(false);

			const _error = error as AxiosError;

			// console.log('[CREATE-PRODUCT-ERROR]', _error);

			toast.error('Error');
		}
	};

	return (
		<div className='fixed h-screen flex flex-col items-center justify-center w-full bg-[#11111190] backdrop-blur-sm z-10'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col w-[90%] lg:w-[35%] bg-white py-2 px-4 max-h-[600px] overflow-y-auto scrollbar__1'
			>
				<div className='flex items-center justify-between px4 w-full'>
					{loading ? (
						<Button
							type='button'
							variant={'outline'}
							className='w-full lg:w-fit bg-main hover:bg-main text-xs text-white hover:text-white rounded-md border-0 py-3 px-6'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='submit'
							variant={'outline'}
							className='w-full lg:w-fit bg-main hover:bg-main text-xs text-white hover:text-white rounded-md border-0 py-3 px-6'
						>
							Promote
						</Button>
					)}

					<Button
						type='button'
						onClick={() => modal.onClose()}
						className='bg-white hover:bg-white'
					>
						<X className='text-red-500 h-4 w-4' />
					</Button>
				</div>

				<div className='flex flex-col items-start w-full space-y-3 mt-3'>
					{promotionProducts?.map((product) => (
						<div
							key={product.id}
							className={`rounded-md p-2 border shadow-md ${
								productIds.includes(parseInt(product.id))
									? 'shadow-green-100 border-green-200'
									: 'border-slate-300'
							} flex items-center justify-between w-full`}
						>
							<div className='flex items-center space-x-2'>
								<input
									type='checkbox'
									checked={productIds.includes(
										parseInt(product.id)
									)}
									onChange={(
										event: React.ChangeEvent<HTMLInputElement>
									) =>
										handleCheckboxChange(event, product?.id)
									}
								/>

								<div className='w-[80px] h-[60px] rounded-md relative'>
									<Image
										fill
										alt=''
										src={getMediaImageUrl(product!)}
										className='object-cover rounded-md'
									/>
								</div>

								<div className='space-y-1'>
									<h1 className='text-xs font-medium'>
										{product?.name}
									</h1>
									<p className='text-xs capitalize'>
										{product?.category.toLowerCase()}
									</p>
								</div>
							</div>

							<p className='text-xs'>
								{product?.isNegotiable
									? PriceFormatter(product?.discountPrice)
									: PriceFormatter(product?.price)}
							</p>
						</div>
					))}
				</div>
			</form>
		</div>
	);
};

export default CreatePromotionModal;
