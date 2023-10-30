'use client';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {ColumnDef} from '@tanstack/react-table';
import Image from 'next/image';

export type ProductColumn = {
	id: string;
	image: string;
	productName: string;
	stock: string;
	price: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: 'id',
		header: '',
	},
	{
		accessorKey: 'productName',
		header: 'Product',
        cell: ({row}) => (
			<div className='flex items-center space-x-4'>
				<Image
					width={60}
					height={60}
					className='rounded-lg'
					alt={row.original.productName}
					src={row.original.image}
				/>

				<p className='text-sm'>{row.original.productName}</p>
			</div>
		),
	},
	{
		accessorKey: 'stock',
		header: 'Stock',
	},
	{
		accessorKey: 'price',
		header: 'Price',
	},
	{
		accessorKey: 'id',
		header: '',
		cell: ({row}) => (
			<Link
				href={'#'}
				className='text-main text-sm underline font-medium'
			>
				Edit
			</Link>
		),
	},
];
