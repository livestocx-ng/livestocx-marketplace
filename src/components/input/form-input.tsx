'use client';

import {cn} from '@/lib/utils';

interface FormTextInputProps {
	disabled?: boolean;
	classes?: string;
	name: string;
	value: string;
	// minLength?: number;
	padding?: string;
	placeHolder: string;
	type?: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormTextInput = ({
	disabled,
	classes,
	name,
	value,
	// minLength,
	handleChange,
	padding,
	placeHolder,
	type,
}: FormTextInputProps) => {
	return (
		<input
			name={name}
			onChange={(event) => handleChange(event)}
			placeholder={placeHolder}
			type={type ? type : 'text'}
			// minLength={minLength}
			value={value}
			disabled={disabled ? disabled : false}
			className={cn(
				'placeholder:text-[12px] text-[12px] hover:outline-none focus:outline-none focus:border-gray-600 focus:ring-blue',
				classes,
				padding ? padding : 'px-5 py-4'
			)}
		/>
	);
};

export default FormTextInput;
