'use client';
import {Button} from '@/components/ui/button';
import {ColumnDef} from '@tanstack/react-table';
import Link from 'next/link';

export type RecentOrderColumn = {
	id: string;
	orderId: string;
	date: string;
	total: string;
	status: string;
};

export const columns: ColumnDef<RecentOrderColumn>[] = [
	{
		accessorKey: 'orderId',
		header: 'Order ID',
	},
	{
		accessorKey: 'date',
		header: 'Date',
	},
	{
		accessorKey: 'total',
		header: 'Total',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: ' ',
		cell: ({row}) => (
			<Link
				href={'#'}
				className='text-main text-sm underline font-medium'
			>
				View Details
			</Link>
		),
	},
];
