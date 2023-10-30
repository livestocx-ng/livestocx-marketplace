'use client';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface SelectDropdownProps {
	label?: string;
	classes?: string;
	data: string[];
}

const SelectDropdown = ({label, data, classes}: SelectDropdownProps) => {
	return (
		<Select>
			<SelectTrigger className={classes}>
				<SelectValue placeholder={label} />
			</SelectTrigger>
			<div className='max-h-[200px] overflow-y-auto'>
				<SelectContent>
					{data.map((item) => (
						<SelectItem key={item} value='light'>
							{item}
						</SelectItem>
					))}
				</SelectContent>
			</div>
		</Select>
	);
};

export default SelectDropdown;
