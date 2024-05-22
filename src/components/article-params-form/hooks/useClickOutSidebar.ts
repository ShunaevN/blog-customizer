import { useEffect } from 'react';

type UseClickOutSidebar = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useClickOutSidebar = ({
	isOpen,
	rootRef,
	onChange,
}: UseClickOutSidebar) => {
	useEffect(() => {
		if (!isOpen) return;
		const toggleSidebarByClick = (event: MouseEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) {
				onChange(false);
			}
		};
		window.addEventListener('mousedown', toggleSidebarByClick);
		return () => window.removeEventListener('mousedown', toggleSidebarByClick);
	}, [isOpen]);
};
