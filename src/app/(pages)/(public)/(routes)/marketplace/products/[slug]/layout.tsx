import axios from 'axios';
import {Metadata, ResolvingMetadata} from 'next';
import {getMediaImageUrl} from '@/utils/media/media.url';
import {getProductIdFromSlug} from '@/utils/slug.formatter';
import {generateOGImageFromURL, generateOGImagesFromURLWithSizes} from '@/utils/og.image.generator';

interface ProductDescriptionLayoutProps {
	params: {
		slug: string;
	};
	children: React.ReactNode;
}

export async function generateMetadata(
	{params}: ProductDescriptionLayoutProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const {data} = await axios.get(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}/user/products/product/${getProductIdFromSlug(params.slug)}`
	);

	const imageUrl = getMediaImageUrl(data.data);
	const sizes = [
		{width: 144, height: 144},
		{width: 300, height: 157},
		{width: 200, height: 200},
		{width: 300, height: 200},
		{width: 300, height: 300},
		{width: 1200, height: 630},
		{width: 4096, height: 4096},
	];

	const ogImages = await generateOGImagesFromURLWithSizes(imageUrl, sizes, 50);

	return {
		title: `Livestocx - ${data.data.name}`,
		description: data.data?.description,
		keywords: ['Livestocx', 'Livestock', 'Nigeria', 'Animals', 'Meat'],
		other: {
			'facebook-domain-verification': 'yy2fxudmyl6e8nxtl2zjx9lss8j8dl',
		},
		openGraph: {
			title: `Livestocx - ${data.data.name}`,
			description: data.data?.description,
			url: 'https://livestocx.com',
			siteName: 'Livestocx',
			type: 'website',
			images: ogImages,
		},
		twitter: {
			card: 'summary',
			site: '@livestocx',
			creator: '@livestocx',
			title: `Livestocx - ${data.data.name}`,
			description: data.data?.description,
			images: ogImages,
		},
	};
}

export default function RootLayout({children}: ProductDescriptionLayoutProps) {
	return <div>{children}</div>;
}
