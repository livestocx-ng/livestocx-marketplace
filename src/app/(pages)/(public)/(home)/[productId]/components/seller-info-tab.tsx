'use client';
const SellerInfoTab = () => {
	return (
		<div className='flex flex-col space-y-5 py-10 px-8'>
			<h1 className='font-semibold text-xl'>Vendor Information</h1>

			<ul className='text-base'>
				<li>
					<span className='font-semibold'>Store Name:</span> Akinwale
					Akinmuyiwa
				</li>
				<li>
					<span className='font-semibold'>Vendor: </span> Akinwale
					Akinmuyiwa Farms
				</li>
				<li>
					<span className='font-semibold'>Address:</span> No 27 Yakubu
					Gowon Way Jos, Plateau State
				</li>
			</ul>

			<p className='text-base'>No ratings found yet!</p>
		</div>
	);
};

export default SellerInfoTab;
