import axios from 'axios';
import {Metadata, ResolvingMetadata} from 'next';
import { formatBlogSlug } from '@/utils/slug.formatter';
import {generateOGImageFromURL} from '@/utils/og.image.generator';

interface BlogDescriptionLayoutProps {
	params: {
		blogId: string;
	};
	children: React.ReactNode;
}

export async function generateMetadata(
	{params}: BlogDescriptionLayoutProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	let ogImage200x200 = '';
	let ogImage300x200 = '';
	let ogImage300x300 = '';
    
    const formattedBlogId = params.blogId.split('_')[1];

	const {data} = await axios.get(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}/admin/fetch-blog?blogId=${formattedBlogId}`
	);

	const imageUrl = data.data.imageUrl;

	if (imageUrl.includes('https')) {
		ogImage200x200 = await generateOGImageFromURL(200, 200, imageUrl);
		ogImage300x200 = await generateOGImageFromURL(300, 200, imageUrl);
		ogImage300x300 = await generateOGImageFromURL(300, 300, imageUrl);
	}

	return {
		title: `Blog - ${data.data.title}`,
		description: `${data.data?.description.slice(0, 30)}...`,
		keywords: ['Livestocx', 'Livestock', 'United States', 'Animals', 'Meat'],
		other: {
			'facebook-domain-verification': 'yy2fxudmyl6e8nxtl2zjx9lss8j8dl',
		},
		openGraph: {
            title: `Blog - ${data.data.title}`,
            description: `${data.data?.description.slice(0, 30)}...`,
			url: `https://livestocx.com/blog/${formatBlogSlug(data.data)}`,
			siteName: 'Livestocx',
			type: 'website',
			images: [
				{
					url: ogImage200x200,
					secureUrl: ogImage200x200,
					width: 200,
					height: 200,
				},
				{
					url: ogImage300x200,
					secureUrl: ogImage300x200,
					width: 300,
					height: 200,
				},
				{
					url: ogImage300x300,
					secureUrl: ogImage300x300,
					width: 300,
					height: 300,
				},
			],
		},
		twitter: {
			card: 'summary',
			site: '@livestocx',
			creator: '@livestocx',
            title: `Blog - ${data.data.title}`,
            description: `${data.data?.description.slice(0, 30)}...`,
			images: [
				{
					url: ogImage200x200,
					secureUrl: ogImage200x200,
					width: 200,
					height: 200,
				},
				{
					url: ogImage300x200,
					secureUrl: ogImage300x200,
					width: 300,
					height: 200,
				},
				{
					url: ogImage300x300,
					secureUrl: ogImage300x300,
					width: 300,
					height: 300,
				},
			],
		},
	};
}

export default function RootLayout({children}: BlogDescriptionLayoutProps) {
	return <div>{children}</div>;
}
