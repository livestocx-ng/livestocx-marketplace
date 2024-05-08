import axios from 'axios';
import {default as Jimp} from 'jimp';

export async function generateOGImageFromURL(
	imageURL: string,
	productSlug: string
): Promise<string> {
	try {
		const response = await axios.get(imageURL, {
			responseType: 'arraybuffer',
		});
		const imageData = Buffer.from(response.data, 'binary');

		const image = await Jimp.read(imageData);
		image.resize(300, 200).cover(300, 200);

		const imageBuffer = await image.getBufferAsync(Jimp.MIME_PNG);

        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/filebin`)

        // console.log('[FILE-BIN-RESPONSE] :: ', data);

		const uploadUrl = `${data.data.uploadUrl}/${productSlug}`;

		await axios.post(uploadUrl, imageBuffer);

		console.log('[OG-IMAGE-UPLOAD-URL] :: ', uploadUrl);

		return uploadUrl;
	} catch (error) {
		console.error('Error while generating SEO OG:image:', error);

		return '';
	}
}

// https://filebin.net/8rq1yyzg1htdpu2q
