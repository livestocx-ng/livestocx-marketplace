import SearchForm from './components/search-form';
import CarouselSlide from './components/carousel-slide';
import HomeProducts from './components/home-products';
import TestimonialSection from '@/components/common/testimonials';

export default function HomePage() {
	return (
		<main className='bg-[#28312B]'>
			<section className='md:h-screen w-full bg-home flex flex-col items-center justify-end gap-y-16 pt-28 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					Best <span className='text-green-600'>deals.</span>{' '}
					Everything <span className='text-green-600'>Livestocx</span>
				</h1>

				<SearchForm />

				<div className='md:px-8 pb-10 w-full'>
					<CarouselSlide />
				</div>
			</section>

			<div className='flex flex-col w-full bg-white px-4 md:px-8 py-10'>
				<HomeProducts />
			</div>

			<TestimonialSection />
		</main>
	);
}
