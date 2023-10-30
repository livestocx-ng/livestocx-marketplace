'use client';
import {Dispatch, FormEventHandler, SetStateAction, useState} from 'react';
import {DropdownMenuCheckboxItemProps} from '@radix-ui/react-dropdown-menu';

import {Button} from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Plus} from 'lucide-react';
import {FilterOptions} from '@/data';

type Checked = DropdownMenuCheckboxItemProps['checked'];

interface CategoryDropDownButtonProps {
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	setShowStatusBar: Dispatch<SetStateAction<Checked>>;
}

export function CategoryDropDownButton({
	value,
	setValue,
	setShowStatusBar,
}: CategoryDropDownButtonProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					className='w-fit flex items-center space-x-3 bg-green-600 rounded hover:bg-green-600 text-white hover:text-white'
				>
					<Plus className='h-4 w-4 text-white' />{' '}
					<p className='text-xs'>Category</p>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				{FilterOptions.map((option) => (
					<DropdownMenuCheckboxItem
						key={option.id}
						onCheckedChange={(checked: Checked) => {
							setValue(option.value);

							setShowStatusBar(checked);
						}}
						// checked={showStatusBar}
						checked={value === option.value ? true : false}
					>
						{option.title}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
