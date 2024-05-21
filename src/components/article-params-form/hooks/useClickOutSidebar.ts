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
		const toggleSidebarByClick = (event: MouseEvent) => {
			const el = event.target as HTMLElement;
			if (
				isOpen &&
				!rootRef.current?.contains(event.target as Node) &&
				!(el?.tagName === 'LI')
			) {
				onChange(false);
			}
		};

		if (isOpen) {
			window.addEventListener('click', toggleSidebarByClick);
		}
		return () => window.removeEventListener('click', toggleSidebarByClick);
	}, [isOpen]);
};
