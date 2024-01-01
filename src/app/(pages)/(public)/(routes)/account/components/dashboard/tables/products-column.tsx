'use client';
import {
	TwitterIcon,
	WhatsappIcon,
	FacebookIcon,
	TwitterShareButton,
	FacebookShareButton,
	WhatsappShareButton,
} from 'react-share';
import Image from 'next/image';
import {Product} from '@/types/types';
import {
	useGlobalStore,
	useUpdateProductModalStore,
	useDeleteProductModalStore,
} from '@/hooks/use-global-store';
import {ColumnDef} from '@tanstack/react-table';
import {PriceFormatter} from '@/utils/price.formatter';

export interface ProductColumn extends Product {}

export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: 'id',
		header: '',
		cell: ({row}) => <p className='text-xs'>{row.index + 1}</p>,
	},
	{
		accessorKey: 'name',
		header: 'Product',
		cell: ({row}) => {
			const {updatePayload, updateCurrentAccountTab} = useGlobalStore();

			return (
				<div
					onClick={() => {
						updatePayload(row.original);
						updateCurrentAccountTab('Product');
					}}
					className='flex items-center space-x-4 cursor-pointer'
				>
					<div className='h-[70px] w-[70px] relative'>
						<Image
							fill
							// width={40}
							// height={40}
							className='w-full h-full object-fill'
							alt={row.original.name}
							src={row.original.media[0].mediaUrl}
						/>
					</div>
					<p className='text-sm'>{row.original.name}</p>
				</div>
			);
		},
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({row}) => {
			const {updatePayload, updateCurrentAccountTab} = useGlobalStore();

			return (
				<p
					onClick={() => {
						updatePayload(row.original);
						updateCurrentAccountTab('Product');
					}}
					className='cursor-pointer'
				>
					{PriceFormatter(row.original.price)}
				</p>
			);
		},
	},
	{
		accessorKey: 'discountPrice',
		header: 'Discount Price',
		cell: ({row}) => {
			const {updatePayload, updateCurrentAccountTab} = useGlobalStore();

			return (
				<p
					onClick={() => {
						updatePayload(row.original);
						updateCurrentAccountTab('Product');
					}}
					className='cursor-pointer'
				>
					{PriceFormatter(row.original.discountPrice)}
				</p>
			);
		},
	},
	{
		accessorKey: 'inStock',
		header: 'In Stock',
		cell: ({row}) => {
			const {updatePayload, updateCurrentAccountTab} = useGlobalStore();

			return (
				<p
					onClick={() => {
						updatePayload(row.original);
						updateCurrentAccountTab('Product');
					}}
					className='cursor-pointer'
				>
					{row.original.inStock === true ? 'True' : 'False'}
				</p>
			);
		},
	},
	{
		accessorKey: 'isNegotiable',
		header: 'Negotiable',
		cell: ({row}) => {
			const {updatePayload, updateCurrentAccountTab} = useGlobalStore();

			return (
				<p
					onClick={() => {
						updatePayload(row.original);
						updateCurrentAccountTab('Product');
					}}
					className='cursor-pointer'
				>
					{row.original.isNegotiable === true ? 'True' : 'False'}
				</p>
			);
		},
	},
	{
		accessorKey: 'id',
		header: 'Share',
		cell: ({row}) => (
			<div className='flex space-x-2'>
				<WhatsappShareButton
					url={`https://livestocx.com/marketplace/products/${row.original.productId.toLowerCase()}`}
					title='Check out this awesome product on Livestocx: '
				>
					<WhatsappIcon size={25} round />
				</WhatsappShareButton>
				<FacebookShareButton
					url={`https://livestocx.com/marketplace/products/${row.original.productId.toLowerCase()}`}
					title='Check out this awesome product on Livestocx: '
				>
					<FacebookIcon size={25} round />
				</FacebookShareButton>
				<TwitterShareButton
					url={`https://livestocx.com/marketplace/products/${row.original.productId.toLowerCase()}`}
					title='Check out this awesome product on Livestocx: '
				>
					<TwitterIcon size={25} round />
				</TwitterShareButton>
			</div>
		),
	},
	{
		accessorKey: 'id',
		header: '',
		cell: ({row}) => {
			const {updatePayload, onOpen} = useUpdateProductModalStore();

			return (
				<p
					onClick={() => {
						updatePayload(row.original);
						onOpen();
					}}
					className='text-main text-sm underline font-medium cursor-pointer'
				>
					Update
				</p>
			);
		},
	},
	// {
	// 	accessorKey: 'id',
	// 	header: '',
	// 	cell: ({row}) => {
	// 		const {updatePayload, onOpen} = useDeleteProductModalStore();

	// 		return (
	// 			<p
	// 				onClick={() => {
	// 					updatePayload(row.original);
	// 					onOpen();
	// 				}}
	// 				className='text-red-500 text-sm underline font-medium cursor-pointer'
	// 			>
	// 				Delete
	// 			</p>
	// 		);
	// 	},
	// },
];
