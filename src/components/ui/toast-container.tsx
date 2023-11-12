'use client';
import {cn} from '@/lib/utils';
import {useToast} from './use-toast';

interface ToastContainerProps {
	variant?: string;
	title?: string;
	description?: string;
}

const ToastContainer = ({variant, title, description}: ToastContainerProps) => {
	const {toast} = useToast();

	return toast({
		variant: variant ?? 'destructive',
		title: title ?? 'Error',
		// className: 'top-0 right-0',
		className: cn(
			'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
		),
		description: description ?? 'An error occured',
	});
};

export default ToastContainer;
