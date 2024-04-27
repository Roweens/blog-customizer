import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent | TouchEvent) => {
			const { target } = event;

			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		document.addEventListener('mouseup', handleClick);
		document.addEventListener('touchend', handleClick);

		return () => {
			document.addEventListener('mouseup', handleClick);
			document.addEventListener('touchend', handleClick);
		};
	}, [onClose, onChange, isOpen]);
};
