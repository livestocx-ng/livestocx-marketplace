import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Livestocx - Marketplace',
	description: 'Best deals, Everything Animals',
	keywords: ['Livestocx', 'Livestock', 'Nigeria', 'Animals', 'Meat'],
	openGraph: {
		title: 'Livestocx - Sign Up',
		description: 'Best deals, Everything Animals',
		url: 'https://livestocx.com',
		siteName: 'Livestocx',
		type: 'website',
		images: [
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x200.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x200.png',
				width: 300,
				height: 200,
			},
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x300.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x300.png',
				width: 300,
				height: 300,
			},
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				alt: 'Livestocx Banner',
				width: 1200,
				height: 630,
			},
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				alt: 'Livestocx Banner',
			},
		],
	},
	twitter: {
		card: 'summary',
		site: '@livestocx',
		creator: '@livestocx',
		title: 'Livestocx',

		description: 'Best deals, Everything Animals',
		images: [
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x200.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x200.png',
				width: 300,
				height: 200,
			},
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x300.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-300x300.png',
				width: 300,
				height: 300,
			},
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				alt: 'Livestocx Banner',
				width: 1200,
				height: 630,
			},
			{
				url: 'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				secureUrl:
					'https://livestocx-media.s3.amazonaws.com/public/livestocx-thumbnail-1200x630.png',
				alt: 'Livestocx Banner',
			},
		],
	},
};

export default function Layout({children}: {children: React.ReactNode}) {
	return <>{children} </>;
}
