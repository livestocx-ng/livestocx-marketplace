'use client';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {FilterOptions} from '@/data';
import {useRouter} from 'next/navigation';

const MarketplaceFilterForm = () => {
	const router = useRouter();

	return (
		<div className='pt-5 px-4'>
			<div className='w-full relative flex items-center justify-between px-4 py-2 bg-gra-300 rounded'>
				<h1></h1>

				{/* <Select
					onValueChange={(value) => {
						console.log('[VALUE] :: ', value)
						router.push(`/marketplace/${value.toLowerCase()}`);
					}}
				>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Filter' />
					</SelectTrigger>
					<SelectContent className='bg-main'>
						<SelectGroup>
							{FilterOptions.map((option) => (
								<SelectItem
									key={option.id}
									value={option.value}
									className='text-white'
									onClick={() => {
										console.log(option.title);

										router.push(
											`/marketplace/${option.value}`
										);
									}}
								>
									{option.title}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select> */}
				<div>
					<select
						name='location'
						className='w-full border py-1 rounded px-3 text-sm scrollbar__1'
						onChange={(
							event: React.ChangeEvent<HTMLSelectElement>
						) => {
							router.push(
								`/marketplace/${event.target.value.toLowerCase()}`
							);
						}}
					>
						<option value=''>Filter</option>
						{FilterOptions.map((option) => (
							<option
								key={option.id}
								value={option.value}
								className='cursor-pointer text-sm'
							>
								{option.title}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default MarketplaceFilterForm;
