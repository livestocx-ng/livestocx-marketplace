'use client';

import {cn} from '@/lib/utils';

interface FormTextAreaInputProps {
	rows: number;
	name: string;
	value: string;
	classes?: string;
	padding?: string;
	placeHolder: string;
	handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextAreaInput = ({
	rows,
	name,
	value,
	classes,
	handleChange,
	padding,
	placeHolder,
}: FormTextAreaInputProps) => {
	return (
		<textarea
			rows={rows}
			name={name}
			value={value}
			placeholder={placeHolder}
			onChange={(event) => handleChange(event)}
			className={cn(
				'placeholder:text-[12px] text-[12px] hover:outline-none focus:outline-none focus:border-gray-600',
				classes,
				padding ? padding : 'px-5 py-4'
			)}
		></textarea>
	);
};

export default FormTextAreaInput;
