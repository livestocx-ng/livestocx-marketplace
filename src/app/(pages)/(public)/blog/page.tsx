'use client';
import {Fragment, useEffect} from 'react';
import Footer from '@/components/navigation/footer';
import {useGlobalStore} from '@/hooks/use-global-store';
import MainNavbar from '@/components/navigation/main-nav-bar';
import BlogCard from '@/components/cards/blog-card';
import { AxiosError } from 'axios';
import axios from 'axios';

const BlogPage = () => {
	const {blogs, updateBlog, updateBlogs} = useGlobalStore();

	const fetchBlogs = async () => {
		try {
			const {data} = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/admin/fetch-blogs`
			);

			// console.log('[CONVERSATIONS-RESPONSE] :: ', data);

			updateBlogs(data.data);
		} catch (error) {
			const _error = error as AxiosError;

			// console.log('[FETCH-BLOGS-ERROR] :: ', _error);
		}
	};

	useEffect(() => {
		fetchBlogs();
	}, []);

	return (
		<Fragment>
			<MainNavbar />

			<article className='bg-[#28312B]'>
				<section className='h-[25vh] md:h-[280px] w-full bg-blog bg-cover flex flex-col items-left justify-center gap-y-3 md:gap-y-10 px-4 md:px-8 py-2 md:py-10 md:pb-2'>
					<h1 className='text-lg md:text-4xl font-medium text-white'>
						Blog
					</h1>
				</section>

				<article className='flex flex-col w-full bg-white px-4 md:px-8 pt-2 pb-10'>
					<section className='flex flex-wrap items-center w-full justify-evenly gap-y-2 gap-x-2 sm:gap-x-2 md:gap-x-2 mt-2'>
						{blogs.map((blog) => (
							<BlogCard key={blog.id} blog={blog} />
						))}
					</section>
				</article>
			</article>
			<Footer />
		</Fragment>
	);
};

export default BlogPage;
