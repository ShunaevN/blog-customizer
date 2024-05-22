import { useEffect } from 'react';

type UseEscapeCloseSidebar = {
	onChange: React.Dispatch<React.SetStateAction<boolean>>;
	isOpen: boolean;
};

export const useEscapeCloseSidebar = ({
	isOpen,
	onChange,
}: UseEscapeCloseSidebar) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleEnterKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onChange(false);
			}
		};
		window.addEventListener('keydown', handleEnterKeyDown);

		return () => {
			window.removeEventListener('keydown', handleEnterKeyDown);
		};
	}, [isOpen]);
};
