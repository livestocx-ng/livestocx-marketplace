'use client';
import Head from 'next/head';
import {Product} from '@/types/types';
import {Fragment, useEffect, useState} from 'react';
import {getMediaImageUrl} from '@/utils/media/media.url';
import {useGlobalStore} from '@/hooks/use-global-store';
import {generateOGImageFromURL} from '@/utils/og.image.generator';

interface ProductDescriptionLayoutProps {
	children: React.ReactNode;
}

const ProductDescriptionPagesLayout = ({
	children,
}: ProductDescriptionLayoutProps) => {
	const {product} = useGlobalStore();

	const [ogImage, setOGImage] = useState<string>('');

	const fetchProductOgImage = async (product: Product) => {
		const imageUrl = getMediaImageUrl(product);

		if (imageUrl.includes('https')) {
			const ogImageBuffer = await generateOGImageFromURL(imageUrl);

			setOGImage(ogImageBuffer);
		}
	};

	useEffect(() => {
		if (product) {
			fetchProductOgImage(product);
		}
	}, [product]);

	return (
		<Fragment>
			{/* <Head> */}
				<title>{product?.name}</title>
				<meta property='og:title' content={product?.name} />
				<meta property='og:image' content={ogImage} />
				<meta property='og:image:width' content='300' />
				<meta property='og:image:height' content='200' />
			{/* </Head> */}
			<div>{children}</div>
		</Fragment>
	);
};

export default ProductDescriptionPagesLayout;
