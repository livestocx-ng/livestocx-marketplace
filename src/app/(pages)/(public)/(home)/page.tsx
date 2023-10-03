'use client';
import {useReducer, useState} from 'react';
import SearchForm from './components/search-form';

export default function HomePage() {
	const [loading, setLoading] = useState(false);

	return (
		<main className='bg-[#28312B]'>
			<section className='h-screen w-full bg-home flex flex-col items-center justify-center gap-y-8'>
				<h1 className='text-5xl font-medium text-white'>
					Best <span className='text-green-600'>deals.</span>{' '}
					Everything <span className='text-green-600'>Livestocx</span>
				</h1>

				<SearchForm />
			</section>
		</main>
	);
}
