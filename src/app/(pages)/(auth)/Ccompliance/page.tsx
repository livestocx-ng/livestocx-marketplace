'use client';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import {toast} from 'react-hot-toast';
import {FileImage} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {NigerianCities, NigerianStates} from '@/data';
import {useGlobalStore} from '@/hooks/use-global-store';
import ButtonLoader from '@/components/loader/button-loader';
import {isFileSizeValid} from '@/utils/media/file.validation';
import FormTextInput from '@/components/input/form-text-input';
import React, {useEffect, useReducer, useRef, useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {ValidateComplianceFormData} from '@/utils/form-validations/compliance.validation';

type FormData = {
	name: string;
	state: string;
	city: string;
	address: string;
	avatar: File | null;
	avatarUrl: string;
	identificationDocument: File | null;
	identificationDocumentUrl: string;
	registrationDocument: File | null;
	registrationDocumentUrl: string;
	email: string;
	phoneNumber: string;
	socials?: string;
	facebookUrl?: string;
	instagramUrl?: string;
	twitterUrl?: string;
	websiteUrl?: string;
	media: [] | null;
	isUpdated: boolean;
};

type FormAction = {
	type: 'UPDATE_FORMDATA';
	payload: Partial<FormData>;
};

const initialState: FormData = {
	name: '',
	state: 'Abia',
	city: '',
	address: '',
	avatar: null,
	avatarUrl: '',
	identificationDocument: null,
	identificationDocumentUrl: '',
	registrationDocument: null,
	registrationDocumentUrl: '',
	email: '',
	socials: '',
	facebookUrl: '',
	instagramUrl: '',
	twitterUrl: '',
	websiteUrl: '',
	media: null,
	phoneNumber: '',
	isUpdated: false,
};

const formReducer = (state: FormData, action: FormAction) => {
	switch (action.type) {
		case 'UPDATE_FORMDATA':
			return {...state, ...action.payload};
		default:
			return state;
	}
};

const CompliancePage = () => {
	const router = useRouter();
	const {user, updateUser} = useGlobalStore();

	const avatarRef = useRef<HTMLInputElement>(null);
	const registrationDocumentRef = useRef<HTMLInputElement>(null);
	const identificationDocumentRef = useRef<HTMLInputElement>(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [formData, updateFormData] = useReducer(formReducer, initialState);

	useEffect(() => {
		if (!user) return router.push(`/signin?redirect_to=compliance`);

		if (user && user?.isVendorProfileUpdated) return router.push(`/`);
	}, [user]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSelectChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		updateFormData({
			type: 'UPDATE_FORMDATA',
			payload: {[event.target.name]: event.target.value},
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			setLoading(true);

			const validationError = ValidateComplianceFormData(formData);

			if (validationError) {
				setLoading(false);
				return toast.error(validationError, {duration: 10000});
			}

			// console.log('[COMPLIANCE-PAYLOAD] :: ', formData);

			const {data} = await axios.patch(
				`${process.env.NEXT_PUBLIC_API_URL}/vendor/update-compliance`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: user?.accessToken,
					},
				}
			);

			// console.log('[DATA] :: ', data.data);

			const cookieUpdate = await axios.patch('/api/auth/update-cookies', {
				...user,
				isVendorProfileUpdated: true,
			});

			await updateUser(cookieUpdate.data);

			setLoading(false);

			toast.success('Compliance updated successfully!');
			router.push('/');
		} catch (error) {
			setLoading(false);

			// console.error('[COMPLIANCE-ERROR]', error);

			toast.error('An error occured');
		}
	};

	return (
		<div className='w-full'>
			<section className='h-[35vh] w-full bg-home flex flex-col items-center justify-center pt-10 md:pt-0'>
				<h1 className='text-xl md:text-5xl font-medium text-white'>
					KYC Verification
				</h1>
			</section>

			<div className='space-y-3 mx-auto text-center py-10 px-4 md:px-8'>
				<h1 className='text-sm font-medium'>
					In order to prevent fraud on our platform, we try to
					identify the identity of our users.
				</h1>
				<h1 className='text-sm font-medium'>
					Please fill out the form to complete your registration.
				</h1>
			</div>

			<div className='flex flex-col justify-center items-center pb-20'>
				<form
					autoComplete='off'
					onSubmit={handleSubmit}
					className='w-[90%] sm:w-[70%] py-5 px-4 sm:px-10 border rounded shadow-md flex flex-col space-y-5'
				>
					<h1 className='text-base font-semibold pb-2 border-b border-b-slate-500'>
						KYC Verification
					</h1>

					<div className='w-full flex justify-between items-center flex-wrap space-y-5 sm:space-y-0'>
						<div className='w-full md:w-[48%]'>
							<p className='text-sm font-medium'>
								Business Name{' '}
								<span className='text-red-500'>*</span>
							</p>
							<FormTextInput
								name='name'
								padding='py-3 px-4'
								disabled={loading}
								value={formData.name}
								handleChange={handleChange}
								placeHolder='Business Name'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
						<div className='w-full md:w-[48%]'>
							<p className='text-sm font-medium'>
								Business Email{' '}
								<span className='text-red-500'>*</span>
							</p>
							<FormTextInput
								name='email'
								padding='py-3 px-4'
								disabled={loading}
								value={formData.email}
								handleChange={handleChange}
								placeHolder='Business Email'
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
					</div>

					<div className='w-full flex justify-between items-center flex-wrap space-y-5 sm:space-y-0'>
						<div className='w-full md:w-[48%]'>
							<p className='text-sm font-medium'>
								Business Address{' '}
								<span className='text-red-500'>*</span>
							</p>
							<FormTextInput
								name='address'
								padding='py-3 px-4'
								disabled={loading}
								placeHolder='Business Address'
								value={formData.address}
								handleChange={handleChange}
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
						<div className='w-full md:w-[48%]'>
							<p className='text-sm font-medium'>
								State <span className='text-red-500'>*</span>
							</p>
							<select
								name='state'
								className='w-full border py-3 rounded px-3 text-sm scrollbar__1'
								onChange={handleSelectChange}
							>
								{NigerianStates.map((option) => (
									<option
										key={option}
										value={option}
										className='cursor-pointer'
									>
										{option}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className='w-full flex justify-between items-center flex-wrap space-y-5 sm:space-y-0'>
						<div className='w-full md:w-[48%]'>
							<p className='text-sm font-medium'>
								City <span className='text-red-500'>*</span>
							</p>
							<select
								name='city'
								className='w-full border py-3 rounded px-3 text-sm scrollbar__1'
								onChange={handleSelectChange}
							>
								<option value=''>City</option>
								{NigerianCities[formData.state].map(
									(option) => (
										<option
											key={option}
											value={option}
											className='cursor-pointer'
										>
											{option}
										</option>
									)
								)}
							</select>
						</div>

						<div className='w-full md:w-[48%]'>
							<p className='text-sm font-medium'>
								Business Phone Number{' '}
								<span className='text-red-500'>*</span>
							</p>
							<FormTextInput
								type='text'
								name='phoneNumber'
								padding='py-3 px-4'
								disabled={loading}
								placeHolder='Business Phone Number'
								value={formData.phoneNumber}
								handleChange={handleChange}
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
					</div>

					<div className='w-full flex justify-between items-center flex-wrap space-y-5 sm:space-y-0'>
						<div className='w-full md:w-[48%]'>
							<p className='text-sm font-medium'>
								Business Facebook Handle
							</p>
							<FormTextInput
								name='facebookUrl'
								padding='py-3 px-4'
								disabled={loading}
								placeHolder='https://web.facebook.com/wazofarm'
								value={formData?.facebookUrl!}
								handleChange={handleChange}
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
						<div className='w-full md:w-[48%]'>
							<p className='text-sm font-medium'>
								Business Instagram Handle
							</p>
							<FormTextInput
								name='instagramUrl'
								padding='py-3 px-4'
								disabled={loading}
								placeHolder='https://instagram/wazofarm'
								value={formData?.instagramUrl!}
								handleChange={handleChange}
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
					</div>

					<div className='w-full flex justify-between items-center flex-wrap space-y-5 sm:space-y-0'>
						<div className='w-full md:w-[48%]'>
							<p className='text-sm font-medium'>
								Business Twitter Handle
							</p>
							<FormTextInput
								name='twitterUrl'
								padding='py-3 px-4'
								disabled={loading}
								placeHolder='https://twitter.com/wazofarm'
								value={formData?.twitterUrl!}
								handleChange={handleChange}
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
						<div className='w-full md:w-[48%]'>
							<p className='text-sm font-medium'>
								Business Website Url
							</p>
							<FormTextInput
								name='websiteUrl'
								padding='py-3 px-4'
								disabled={loading}
								placeHolder='www.wazofarm.com'
								value={formData?.websiteUrl!}
								handleChange={handleChange}
								classes='w-full text-sm placeholder:text-sm border focus:border-slate-500 rounded'
							/>
						</div>
					</div>

					<div className='w-full flex items-center md:space-x-5'>
						<div className='flex flex-col lg:flex-row space-y-3 lg:space-y-0 items-start lg:space-x-5 w-full'>
							<div className='flex items-start justify-between lg:justify-start lg:space-x-5 w-full lg:w-fit'>
								<div className='flex flex-col w-[180px]'>
									<h1 className='text-sm font-medium'>
										Business Logo{' '}
										{/* <span className='text-red-500'>*</span> */}
									</h1>
									<p className='text-xs text-slate-400'>
										Image.
									</p>
								</div>

								<div className='w-[80px] h-[80px] rounded border flex items-center justify-center relative'>
									{formData.avatar ? (
										<Image
											alt=''
											fill
											src={formData.avatarUrl}
											className='object-fill h-full w-full absolute'
										/>
									) : (
										<FileImage
											className={`h-[40px] w-[40px] text-slate-400`}
										/>
									)}
								</div>
							</div>
							<div className='flex flex-col items-center justify-center rounded border text-sm w-full h-[80px] p-3 '>
								<input
									type='file'
									name='avatar'
									ref={avatarRef}
									accept='.jpeg, .jpg'
									style={{display: 'none'}}
									onChange={(
										event: React.ChangeEvent<HTMLInputElement>
									) => {
										if (
											!isFileSizeValid(
												event.target.files![0]
											)
										)
											return toast.error(
												'File size must be below 500kb'
											);

										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												avatar: event.target.files![0],
												avatarUrl: URL.createObjectURL(
													event.target.files![0]
												),
											},
										});
									}}
								/>

								<p
									className='text-sky-500 cursor-pointer'
									onClick={() => avatarRef.current?.click()}
								>
									Click to upload
								</p>
								<p>JPEG or JPG (max. 1mb)</p>
							</div>
						</div>
					</div>

					<div className='w-full flex items-center md:space-x-5'>
						<div className='flex flex-col lg:flex-row space-y-3 lg:space-y-0 items-start lg:space-x-5 w-full'>
							<div className='flex items-start justify-between lg:justify-start lg:space-x-5 w-full lg:w-fit'>
								<div className='flex flex-col w-[180px]'>
									<h1 className='text-sm font-medium'>
										Means of Identification{' '}
										<span className='text-red-500'>*</span>
									</h1>
									<p className='text-xs text-slate-400'>
										NIN, Voter’s Card, Passport.
									</p>
								</div>

								<div className='w-[80px] h-[80px] rounded border flex items-center justify-center relative'>
									{formData.identificationDocument?.type.includes(
										'image'
									) ? (
										<Image
											alt=''
											fill
											src={
												formData.identificationDocumentUrl
											}
											className='object-fill h-full w-full absolute'
										/>
									) : (
										<FileImage
											className={`h-[40px] w-[40px] ${
												formData.identificationDocument
													? 'text-green-500'
													: 'text-slate-400'
											}`}
										/>
									)}
								</div>
							</div>

							<div className='flex flex-col items-center justify-center rounded border text-sm w-full h-[80px] p-3 '>
								<input
									type='file'
									name='avatar'
									ref={identificationDocumentRef}
									accept='.jpeg, .jpg, .pdf'
									style={{display: 'none'}}
									onChange={(
										event: React.ChangeEvent<HTMLInputElement>
									) => {
										if (
											!isFileSizeValid(
												event.target.files![0]
											)
										)
											return toast.error(
												'File size must be below 500kb'
											);

										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												identificationDocument:
													event.target.files![0],
												identificationDocumentUrl:
													URL.createObjectURL(
														event.target.files![0]
													),
											},
										});
									}}
								/>

								<p
									className='text-sky-500 cursor-pointer'
									onClick={() =>
										identificationDocumentRef.current?.click()
									}
								>
									Click to upload
								</p>
								<p>JPEG, JPG, or PDF (max. 1mb)</p>
							</div>
						</div>
					</div>

					<div className='w-full flex items-center md:space-x-5'>
						<div className='flex flex-col lg:flex-row space-y-3 lg:space-y-0 items-start lg:space-x-5 w-full'>
							<div className='flex items-start justify-between lg:justify-start lg:space-x-5 w-full lg:w-fit'>
								<div className='flex flex-col w-[180px]'>
									<h1 className='text-sm font-medium'>
										Registration Document(s)
									</h1>
									<p className='text-xs text-slate-400'>
										CAC/SCUML/Business Name.
									</p>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant='outline'
												className='border-0 bg-white hover:bg-white text-main'
											>
												What's this?
											</Button>
										</PopoverTrigger>
										<PopoverContent>
											<Link
												className=''
												target='_blank'
												href={'https://www.cac.gov.ng'}
											>
												https://www.cac.gov.ng/
											</Link>
										</PopoverContent>
									</Popover>
								</div>

								<div className='w-[80px] h-[80px] rounded border flex items-center justify-center relative'>
									{formData.registrationDocument?.type.includes(
										'image'
									) ? (
										<Image
											alt=''
											fill
											src={
												formData.registrationDocumentUrl
											}
											className='object-fill h-full w-full absolute'
										/>
									) : (
										<FileImage
											className={`h-[40px] w-[40px] ${
												formData.registrationDocument
													? 'text-green-500'
													: 'text-slate-400'
											}`}
										/>
									)}
								</div>
							</div>

							<div className='flex flex-col items-center justify-center rounded border text-sm w-full h-[80px] p-3 '>
								<input
									type='file'
									name='avatar'
									ref={registrationDocumentRef}
									accept='.jpeg, .jpg, .pdf'
									style={{display: 'none'}}
									onChange={(
										event: React.ChangeEvent<HTMLInputElement>
									) => {
										if (
											!isFileSizeValid(
												event.target.files![0]
											)
										)
											return toast.error(
												'File size must be below 500kb'
											);

										updateFormData({
											type: 'UPDATE_FORMDATA',
											payload: {
												registrationDocument:
													event.target.files![0],
												registrationDocumentUrl:
													URL.createObjectURL(
														event.target.files![0]
													),
											},
										});
									}}
								/>

								<p
									className='text-sky-500 cursor-pointer'
									onClick={() =>
										registrationDocumentRef.current?.click()
									}
								>
									Click to upload
								</p>
								<p>JPEG, JPG, or PDF (max. 1mb)</p>
							</div>
						</div>
					</div>

					{loading ? (
						<Button
							type='button'
							className='bg-main text-white h-12 hover:bg-main w-full rounded py-3 cursor-default'
						>
							<ButtonLoader />
						</Button>
					) : (
						<Button
							type='submit'
							className='bg-main text-white h-12 hover:bg-main w-full rounded py-3'
						>
							Submit
						</Button>
					)}
				</form>
			</div>
		</div>
	);
};

export default CompliancePage;
