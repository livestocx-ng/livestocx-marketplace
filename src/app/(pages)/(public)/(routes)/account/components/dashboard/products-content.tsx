'use client';
import {Plus} from 'lucide-react';
import {useModal} from '@/hooks/use-modal';
import {Button} from '@/components/ui/button';
import {DataTable} from '@/components/ui/data-table';
import {ProductColumn, columns} from './tables/products-column';
import {useEffect, useState} from 'react';
import {Product} from '@/types/types';
import axios, {AxiosError} from 'axios';
import {User, useUserHook} from '@/hooks/use-user';

// const Products: ProductColumn[] = [
// 	{
// 		id: '1',
// 		productName: '5 weeks old broilers',
// 		image: '/product__2.png',
// 		stock: 'In Stock',
// 		price: '#13,500',
// 	},
// ];

interface ProductsContentProps {
	user: User | null;
	isAddProductModalOpen: boolean;
	onAddProductModalOpen: () => void;
}

const ProductsContent = ({
	user,
	isAddProductModalOpen,
	onAddProductModalOpen,
}: ProductsContentProps) => {
	const [products, setProducts] = useState<Product[]>([]);

	const fetchProducts = async () => {
		try {
			console.log('[USER] ::  ', user);

			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/products/fetch-all`,
				{
					headers: {
						Authorization: user?.accessToken,
					},
				}
			);

			console.log('[DATA] ::  ', data);

			setProducts(data.data.products);
		} catch (error) {
			const _error = error as AxiosError;

			console.log('[FETCH-PRODUCTS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div className='w-[78%] flex flex-col gap-5 '>
			<div className='flex justify-end'>
				<Button
					type='button'
					onClick={() => {
						if (!isAddProductModalOpen) {
							onAddProductModalOpen();
						}
					}}
					className='bg-green-600 flex items-center space-x-3 text-white h-10 hover:bg-green-700 w-fit rounded py-2'
				>
					<Plus className='h-4 w-4' /> <p>Add Product</p>
				</Button>
			</div>

			<DataTable
				data={products}
				// data={Products}
				columns={columns}
				borderRadius='rounded-b'
			/>
		</div>
	);
};

export default ProductsContent;
