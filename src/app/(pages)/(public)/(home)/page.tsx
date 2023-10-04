import SearchForm from './components/search-form';
import CarouselSlide from './components/carousel-slide';
import HomeProducts from './components/home-products';
import TestimonialCard from './components/testimonial-card';
import {Testimonials} from '@/data';

export default function HomePage() {
	return (
		<main className='bg-[#28312B]'>
			<section className='h-screen w-full bg-home flex flex-col items-center justify-end gap-y-16'>
				<h1 className='text-5xl font-medium text-white'>
					Best <span className='text-green-600'>deals.</span>{' '}
					Everything <span className='text-green-600'>Livestocx</span>
				</h1>

				<SearchForm />

				<div className='px-8 pb-10 w-full'>
					<CarouselSlide />
				</div>
			</section>

			<div className='flex flex-col w-full bg-white px-8 py-10'>
				<HomeProducts />
			</div>

			<div className='flex items-center justify-between flex-wrap px-8 py-10 bg-white'>
				{Testimonials.map((testimonial) => (
					<TestimonialCard key={testimonial.id} data={testimonial} />
				))}
			</div>
		</main>
	);
}
