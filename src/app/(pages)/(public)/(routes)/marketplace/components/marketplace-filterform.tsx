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
		<div className='pt-10 px-4'>
			<div className='w-full relative flex items-center justify-between px-4 py-2 bg-gray-300 rounded'>
				<h1>Results</h1>

				<Select
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
							{/* <SelectLabel className='text-white'>Filter</SelectLabel> */}
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
				</Select>
			</div>
		</div>
	);
};

export default MarketplaceFilterForm;
