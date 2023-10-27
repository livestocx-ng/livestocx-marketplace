import axios, {AxiosError} from 'axios';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
	try {
		const payload = await req.json();

		const {data} = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
			payload
		);

		console.log('[SIGNUP-DATA] :: ', data);

		return NextResponse.json(data, {
			status: 200,
		});
	} catch (e) {
		const error = e as AxiosError;

		console.log('[ERROR] :: ', error);

		return NextResponse.json(
			{message: 'An error occured', error: error},
			{status: 400}
		);
	}
}
