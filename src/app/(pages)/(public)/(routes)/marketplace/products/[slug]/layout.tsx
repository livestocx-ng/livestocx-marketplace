import { getMediaImageUrl } from '@/utils/media/media.url';
import { generateOGImageFromURL } from '@/utils/og.image.generator';
import {getProductIdFromSlug} from '@/utils/slug.formatter';
import axios from 'axios';
import {Metadata, ResolvingMetadata} from 'next';

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
	console.log('SLUG ', params.slug);

    let ogImage = '';

	const {data} = await axios.get(
		`${
			process.env.NEXT_PUBLIC_API_URL
		}/user/products/product/${getProductIdFromSlug(params.slug)}`
	);

    const imageUrl = getMediaImageUrl(data.data);

    if(imageUrl.includes('https')){
        ogImage = await generateOGImageFromURL(imageUrl);
    }

	return {
		title: `Livestocx - ${data.data.name}`,
		openGraph: {
			images: [
                {
                    url: ogImage,
                    secureUrl:
                        ogImage,
                    width: 300,
                    height: 200,
                },
            ],
		},
	};
}

export default function RootLayout({children}: ProductDescriptionLayoutProps) {
	return <div>{children}</div>;
}
