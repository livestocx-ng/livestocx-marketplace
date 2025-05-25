import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: 'Livestocx - Blog',
	description: 'Livestocx blog',
	keywords: ['Livestocx', 'Livestock', 'United States', 'Pets', 'Animals', 'Meat'],
	other: {
		'facebook-domain-verification': 'yy2fxudmyl6e8nxtl2zjx9lss8j8dl',
	},
	openGraph: {
		title: 'Livestocx - Blog',
		description: 'Livestocx blog',
		url: 'https://animaff.com',
		siteName: 'Livestocx',
		type: 'website',
		images: [
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x200.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x200.png',
				width: 300,
				height: 200,
			},
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x300.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x300.png',
				width: 300,
				height: 300,
			},
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				alt: 'Livestocx Banner',
				width: 1200,
				height: 630,
			},
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				alt: 'Livestocx Banner',
			},
		],
	},
	twitter: {
		card: 'summary',
		site: '@livestocx',
		creator: '@livestocx',
		title: 'Livestocx - Blog',
		description: 'Livestocx blog',
		images: [
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x200.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x200.png',
				width: 300,
				height: 200,
			},
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x300.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-300x300.png',
				width: 300,
				height: 300,
			},
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				alt: 'Livestocx Banner',
				width: 1200,
				height: 630,
			},
			{
				url: 'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				secureUrl:
					'https://animaff-media.s3.amazonaws.com/public/animaff-thumbnail-1200x630.png',
				alt: 'Livestocx Banner',
			},
		],
	},
};
export default function BlogLayout({children}: {children: React.ReactNode}) {
	return <>{children}</>;
}
