import axios from 'axios';
import {Metadata, ResolvingMetadata} from 'next';
import {
	generateOGImageFromURL,
	generateOGImagesFromURLWithSizes,
} from '@/utils/og.image.generator';

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
	const {data} = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/user/sellers/profile?slug=${params.sellerSlug}`
	);

	// console.log('[SEO-SELLER-DATA] :: ', data);

	const sizes = [
		{width: 144, height: 144},
		{width: 300, height: 157},
		{width: 200, height: 200},
		{width: 300, height: 200},
		{width: 300, height: 300},
		// {width: 1200, height: 630},
		// {width: 4096, height: 4096},
	];

	const imageUrl = data.data.avatar;

	// if (imageUrl.includes('https')) {
	const ogImages = await generateOGImagesFromURLWithSizes(imageUrl, sizes);
	// }

	return {
		title: data.data.name,
		description: 'Best deals, Everything Animals',
		openGraph: {
			title: data.data.name,
			description: 'Best deals, Everything Animals',
			url: 'https://livestocx.com',
			siteName: 'Livestocx',
			type: 'website',
			images: ogImages,
		},
		twitter: {
			card: 'summary',
			site: '@livestocx',
			creator: '@livestocx',
			title: data.data.name,
			description: 'Best deals, Everything Animals',
			images: ogImages,
		},
	};
}

export default function RootLayout({children}: SellerProfileLayoutProps) {
	return <div>{children}</div>;
}
