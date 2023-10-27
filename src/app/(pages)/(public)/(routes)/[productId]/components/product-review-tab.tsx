'use client';
import {useState} from 'react';
import {Star} from 'lucide-react';
import {Button} from '@/components/ui/button';
import FormTextAreaInput from '@/components/input/form-text-area-input';

const ProductReviewTab = () => {
	const [review, setReview] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReview(event.target.value);

		console.log('[REVIEW] :: ', event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log('[REVIEW-PAYLOAD] :: ', review);
	};

	return (
		<div className='flex flex-col space-y-5 py-10 px-4 md:px-8'>
			<form onSubmit={handleSubmit} className='space-y-5'>
				<p className='text-base font-semibold'>
					Be the first to review this product
				</p>

				<div className='flex items-center space-x-10'>
					<p className='text-sm md:text-base font-semibold'>Your ratings</p>
					<div className='flex space-x-3 items-center'>
						{[1, 2, 3, 4, 5].map((item) => (
							<Star key={item} className='text-slate-500' />
						))}
					</div>
				</div>

				<FormTextAreaInput
					rows={7}
					value={review}
					padding='py-4 px-4'
					name='review'
					handleChange={handleChange}
					placeHolder='Write your review here'
					classes='w-full text-sm placeholder:text-sm border border-orange-500 focus:border-orange-500 rounded-lg resize-none'
				/>

				<Button
					type='submit'
					variant={'outline'}
					className='border-main hover:border-main'
				>
					Submit
				</Button>
			</form>

			<div className='w-full space-y-5'>
				<div className='w-full bg-slate-200 text-centr py-4 pl-5 font-semibold'>
					Review
				</div>

				<h1 className='text-x'>No reviews yet</h1>
			</div>
		</div>
	);
};

export default ProductReviewTab;
