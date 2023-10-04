import {Star} from 'lucide-react';

import {Testimonial} from '@/data';
import Image from 'next/image';

const TestimonialCard = ({data}: {data: Testimonial}) => {
	return (
		<div className='flex flex-col items-center justify-center space-y-5 w-[350px] h-[350px] bg-white border rounded-lg px-4 py-8'>
			<div className='flex space-x-3 items-center'>
				{[1, 2, 3, 4, 5].map((item) => (
					<Star key={item} className='text-orange-500' />
				))}
			</div>

			<p className='text-center'>{data.description}</p>

			<div className='flex items-center text-main font-medium space-x-4'>
				<Image
					width={50}
					height={50}
					alt='testimonial'
					src={data.avatar}
				/>

				<p className='text-sm'>{data.author}</p>
			</div>
		</div>
	);
};

export default TestimonialCard;
