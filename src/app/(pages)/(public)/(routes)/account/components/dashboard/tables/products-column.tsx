'use client';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {ColumnDef} from '@tanstack/react-table';
import Image from 'next/image';
import {Product} from '@/types/types';
import {
	useDeleteProductModalStore,
	useUpdateProductModalStore,
} from '@/hooks/use-global-store';
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
		cell: ({row}) => (
			<div className='flex items-center space-x-4'>
				<div className='h-[80px] w-[80px] relative'>
					<Image
						fill
						// width={40}
						// height={40}
						className='rounded-lg w-full h-full'
						alt={row.original.name}
						src={row.original.media[0].mediaUrl}
					/>
				</div>
				<p className='text-sm'>{row.original.name}</p>
			</div>
		),
	},
	{
		accessorKey: 'price',
		header: 'Price',
		cell: ({row}) => <p>{PriceFormatter(row.original.price)}</p>,
	},
	{
		accessorKey: 'discountPrice',
		header: 'Discount Price',
		cell: ({row}) => <p>{PriceFormatter(row.original.discountPrice)}</p>,
	},
	{
		accessorKey: 'isNegotiable',
		header: 'Negotiable',
		cell: ({row}) => (
			<p>{row.original.isNegotiable === true ? 'True' : 'False'}</p>
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
	{
		accessorKey: 'id',
		header: '',
		cell: ({row}) => {
			const {updatePayload, onOpen} = useDeleteProductModalStore();

			return (
				<p
					onClick={() => {
						updatePayload(row.original);
						onOpen();
					}}
					className='text-red-500 text-sm underline font-medium cursor-pointer'
				>
					Delete
				</p>
			);
		},
	},
];