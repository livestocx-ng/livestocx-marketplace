import axios from 'axios';
import {Metadata, ResolvingMetadata} from 'next';
import {generateOGImageFromURL} from '@/utils/og.image.generator';

interface SellerProfileLayoutProps {
	params: {
		sellerSlug: string;
	};
	children: React.ReactNode;
}

export async function generateMetadata(
	{params}: SellerProfileLayoutProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	let ogImage144x144 = '';
	let ogImage300x157 = '';
	let ogImage200x200 = '';
	let ogImage300x200 = '';
	let ogImage300x300 = '';
	let ogImage1200x630 = '';
	let ogImage4096x4096 = '';

	const {data} = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/profile?slug=${params.sellerSlug}`
	);

	// console.log('[SEO-SELLER-DATA] :: ', data);

	const imageUrl = data.data.avatar;

	if (imageUrl.includes('https')) {
		ogImage144x144 = await generateOGImageFromURL(144, 144, imageUrl);
		ogImage300x157 = await generateOGImageFromURL(300, 157, imageUrl);
		ogImage200x200 = await generateOGImageFromURL(200, 200, imageUrl);
		ogImage300x200 = await generateOGImageFromURL(300, 200, imageUrl);
		ogImage300x300 = await generateOGImageFromURL(300, 300, imageUrl);
		ogImage1200x630 = await generateOGImageFromURL(1200, 630, imageUrl);
		ogImage4096x4096 = await generateOGImageFromURL(4096, 4096, imageUrl);
	}

	return {
		title: data.data.name,
		description: 'Best deals, Everything Animals',
		openGraph: {
			title: data.data.name,
			description: 'Best deals, Everything Animals',
			url: 'https://livestocx.com',
			siteName: 'Livestocx',
			type: 'website',
			images: [
				{
					url: ogImage144x144,
					secureUrl: ogImage144x144,
					alt: 'Livestocx Banner',
					width: 144,
					height: 144,
				},
				{
					url: ogImage300x157,
					secureUrl: ogImage300x157,
					alt: 'Livestocx Banner',
					width: 300,
					height: 157,
				},
				{
					url: ogImage200x200,
					secureUrl: ogImage200x200,
					alt: 'Livestocx Banner',
					width: 200,
					height: 200,
				},
				{
					url: ogImage300x200,
					secureUrl: ogImage300x200,
					alt: 'Livestocx Banner',
					width: 300,
					height: 200,
				},
				{
					url: ogImage300x300,
					secureUrl: ogImage300x300,
					alt: 'Livestocx Banner',
					width: 300,
					height: 300,
				},
				{
					url: ogImage1200x630,
					secureUrl: ogImage1200x630,
					alt: 'Livestocx Banner',
					width: 1200,
					height: 630,
				},
				{
					url: ogImage4096x4096,
					secureUrl: ogImage4096x4096,
					alt: 'Livestocx Banner',
					width: 4096,
					height: 4096,
				},
			],
		},
		twitter: {
			card: 'summary',
			site: '@livestocx',
			creator: '@livestocx',
			title: data.data.name,
			description: 'Best deals, Everything Animals',
			images: [
				{
					url: ogImage144x144,
					secureUrl: ogImage144x144,
					alt: 'Livestocx Banner',
					width: 144,
					height: 144,
				},
				{
					url: ogImage300x157,
					secureUrl: ogImage300x157,
					alt: 'Livestocx Banner',
					width: 300,
					height: 157,
				},
				{
					url: ogImage200x200,
					secureUrl: ogImage200x200,
					alt: 'Livestocx Banner',
					width: 200,
					height: 200,
				},
				{
					url: ogImage300x200,
					secureUrl: ogImage300x200,
					alt: 'Livestocx Banner',
					width: 300,
					height: 200,
				},
				{
					url: ogImage300x300,
					secureUrl: ogImage300x300,
					alt: 'Livestocx Banner',
					width: 300,
					height: 300,
				},
				{
					url: ogImage1200x630,
					secureUrl: ogImage1200x630,
					alt: 'Livestocx Banner',
					width: 1200,
					height: 630,
				},
				{
					url: ogImage4096x4096,
					secureUrl: ogImage4096x4096,
					alt: 'Livestocx Banner',
					width: 4096,
					height: 4096,
				},
			],
		},
	};
}

export default function RootLayout({children}: SellerProfileLayoutProps) {
	return <div>{children}</div>;
}
