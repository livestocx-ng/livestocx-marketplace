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
	console.log('SLUG ', params.sellerSlug);

	let ogImage300x200 = '';
	let ogImage300x300 = '';

	const {data} = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/profile?slug=${params.sellerSlug}`
	);

	// console.log('[SEO-SELLER-DATA] :: ', data);

	const imageUrl = data.data.avatar;

	if (imageUrl.includes('https')) {
		ogImage300x200 = await generateOGImageFromURL(
			300,
			200,
			imageUrl,
		);
		ogImage300x300 = await generateOGImageFromURL(
			300,
			300,
			imageUrl,
		);
	}

	return {
		title: `Livestocx - ${data.data.name}`,
		openGraph: {
			images: [
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
			images: [
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

export default function RootLayout({children}: SellerProfileLayoutProps) {
	return <div>{children}</div>;
}
