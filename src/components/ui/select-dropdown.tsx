'use client';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface SelectDropdownProps {
	label: string;
	data: string[];
}

const SelectDropdown = ({label, data}: SelectDropdownProps) => {
	return (
		<Select>
			<SelectTrigger className='w-[180px'>
				<SelectValue placeholder={label} />
			</SelectTrigger>
			<SelectContent>
				{data.map((item) => (
					<SelectItem key={item} value='light'>
						{item}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

export default SelectDropdown;
