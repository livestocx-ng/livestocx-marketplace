import axios from 'axios';
import { default as Jimp } from 'jimp';

export async function generateOGImageFromURL(
    imageURL: string
): Promise<string> {
    try {
        const response = await axios.get(imageURL, {
            responseType: 'arraybuffer',
        });
        const imageData = Buffer.from(response.data, 'binary');

        const image = await Jimp.read(imageData);
        image.resize(300, 200).cover(300, 200);

        console.log('Image cropped successfully!');

        return image.getBase64Async(Jimp.AUTO);
    } catch (error) {
        console.error('Error while generating SEO OG:image:', error);

        return '';
    }
}