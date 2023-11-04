import axios, {AxiosError} from 'axios';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
	try {
		const payload = await req.json();
		const data_ = await req.formData();

		console.log('[PAYLOAD] :: ', payload);
		console.log('[PAYLOAD] :: ', data_);

		const {data} = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/products/create`,
			payload,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: payload.accessToken,
				},
			}
		);

		return NextResponse.json(data, {
			status: 200,
		});
	} catch (e) {
		const error = e as AxiosError;

		console.log('[ERROR] :: ', error);

		return NextResponse.json(
			{
				error: error,
				message: 'An error occured while creating a product',
			},
			{status: 400}
		);
	}
}
