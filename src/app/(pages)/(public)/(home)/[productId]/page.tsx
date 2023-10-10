'use client';
import Image from 'next/image';
import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {FlagTriangleRight} from 'lucide-react';
import AuthHeader from '@/components/header/auth-header';
import {cn} from '@/lib/utils';
import SellerInfoTab from './components/seller-info-tab';
import ProductReviewTab from './components/product-review-tab';
import ProductCard from '../components/product-card';

interface ProductPageParams {
	params: {
		productId: string;
	};
}

type Tab = 'Seller Info' | 'Review' | 'More From Seller';

const CurrentTabs: Tab[] = ['Seller Info', 'Review', 'More From Seller'];

const ProductPage = ({params: {productId}}: ProductPageParams) => {
	console.log('[PRODUCT-ID] :: ', productId);
	const [currentTab, setCurrentTab] = useState<Tab>('Seller Info');

	return (
		<main className='w-full'>
			<AuthHeader classes='md:h-[35vh]' />

			<div className='flex flex-col justify-start items-start py-10 md:px-8'>
				<h1 className='text-orange-500 text-xl'>6 weeks Broilers</h1>

				<div className='flex flex-wrap justify-between items-start md:h-[500px] w-full'>
					<div className='w-full md:w-[55%] h-[300px] md:h-full relative mb-5 md:mb-0'>
						<Image
							fill
							alt={'product'}
							src={'/product__2.png'}
							className='md:rounded-lg h-full w-full'
						/>
					</div>
					<div className='w-full md:w-[40%] flex flex-col justify-between md:h-full px-4 md:px-0'>
						<div className='flex flex-col justify-between h-[230px] md:h-[45%] border border-slate-500 md:rounded-tr-lg p-4'>
							<h1 className='text-xl md:text-2xl '>
								&#8358;5,400 - &#8358;6,000, Negotiable
							</h1>

							<div className='flex items-center space-x-3'>
								<Image
									width={50}
									height={50}
									alt={'user icon'}
									src={'/icon__user.svg'}
									className='rounded-full'
								/>

								<div className='flex flex-col spaxe-y-3'>
									<p className='text-base'>
										Akinwale Akinmuyiwa
									</p>
									<p className='text-xs py-2 text-center bg-gray-200 rounded-md'>
										Replies in 2 days
									</p>
								</div>
							</div>

							<div className='flex items-center justify-between'>
								<Button
									type='button'
									variant={'outline'}
									className='border-main text-main h-12 w-[45%] rounded-full py-4'
								>
									Show contact
								</Button>

								<Button
									type='button'
									variant={'outline'}
									className='flex items-center space-x-3 border-red-500 text-red-500 h-12 w-[45%] rounded-full py-4'
								>
									<p>Report</p>{' '}
									<FlagTriangleRight className='h-4 w-4 text-red-500' />
								</Button>
							</div>
						</div>

						<div className='flex flex-col space-y-3 h-full md:h-fit border border-slate-500 p-4 mt-5 md:mt-0'>
							<h1 className='text-2xl '>Safety Tips</h1>

							<ul className='text-sm list-disc pl-3'>
								<li>
									If you wish to meet a seller, meet in a
									place where there are other people around
									and where you can easily leave if you feel
									uncomfortable.
								</li>
								<li>
									Be wary of sellers who ask for money
									upfront.
								</li>
								<li>
									Make sure the goods are what you expected
									and that they are in satisfactory condition
									before you pay anything.
								</li>
								<li>
									Review any paperwork carefully and don't pay
									until you are satisfied.
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-2 gap-5 md:gap-0 md:flex items-center justify-between w-full mt-10 rounded-lg px-4 md:px-0'>
					{[1, 2, 3, 4].map((item, index) => (
						<div
							key={item}
							className='h-[150px] md:h-[200px] w-full md:w-[300px] relative'
						>
							<Image
								fill
								alt={'product'}
								src={'/product__2.png'}
								className='rounded-lg h-full w-full '
							/>

							{item === 4 && (
								<div className='absolute top-0 h-full w-full bg-[#11111190] flex items-center justify-center rounded-lg cursor-pointer'>
									<p className='text-xs md:text-base text-center text-white'>
										See more images
									</p>
								</div>
							)}
						</div>
					))}
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

				<div className='w-full'>
					{currentTab === 'Seller Info' && <SellerInfoTab />}
					{currentTab === 'Review' && <ProductReviewTab />}
				</div>

				<div className='flex flex-col space-y-5 w-full px-4 md:px-0'>
					<div className='w-full bg-slate-200 text-centr py-4 pl-5 font-semibold'>
						Related Products
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 w-full'>
						{[1, 2, 3, 4, 5, 6, 7].map((item) => (
							<ProductCard key={item} />
						))}
					</div>
				</div>
			</div>
		</main>
	);
};

export default ProductPage;
