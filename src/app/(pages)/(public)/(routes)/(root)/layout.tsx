import {generateOGImagesFromURLWithSizes} from '@/utils/og.image.generator';
import type {Metadata, ResolvingMetadata} from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const imageUrl =
		'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png';
	const sizes = [
		{width: 144, height: 144},
		{width: 300, height: 157},
		{width: 200, height: 200},
		{width: 300, height: 200},
		{width: 300, height: 300},
		// {width: 1200, height: 630},
		// {width: 4096, height: 4096},
	];

	const ogImages = await generateOGImagesFromURLWithSizes(imageUrl, sizes);

	return {
		title: 'Livestocx - Marketplace',
		description: 'Best deals, Everything Animals',
		keywords: ['Livestocx', 'Livestock', 'Nigeria', 'Animals', 'Meat'],
		openGraph: {
			title: 'Livestocx - Marketplace',
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
			title: 'Livestocx - Marketplace',
			description: 'Best deals, Everything Animals',
			images: ogImages,
		},
	};
}

export default function Layout({children}: {children: React.ReactNode}) {
	return <>{children} </>;
}
