import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';
import { Text } from '../text';
import { Select } from '../select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
} from 'src/constants/articleProps';

export const ArticleParamsForm = () => {
	const formRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const changeOpenState = () => {
		setIsOpen(!isOpen);
	};

	// const [formState, setFormState] = useState(defaultArticleState);

	// const change = (selected: OptionType) => {
	// 	console.log(selected, defaultArticleState);
	// };

	const toggleSidebarByClick = (event: MouseEvent) => {
		if (isOpen && !formRef.current?.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
	};

	useEffect(() => {
		document.addEventListener('click', toggleSidebarByClick);
		return () => document.removeEventListener('click', toggleSidebarByClick);
	}, [isOpen]);

	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isOpen} setIsOpen={changeOpenState} />
			{isOpen && (
				<aside
					className={clsx(styles.container, isOpen && styles.container_open)}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text size={31} weight={800} uppercase>
							задайте параметры
						</Text>
						<div style={{ height: '50px' }}></div>

						<Select
							selected={fontFamilyOptions[0]}
							options={fontFamilyOptions}
							// onChange={change}
							title='шрифт'
						/>
						<div style={{ height: '50px' }}></div>
						<Text weight={800} size={18} uppercase={true}>
							размер шрифта
						</Text>
						<div className={styles.bottomContainer}>
							<Button title='18 PX' />
							<Button title='25 PX' />
							<Button title='38 PX' />
						</div>
						<div style={{ height: '50px' }}></div>
						<Select
							selected={fontColors[0]}
							options={fontColors}
							// onChange={change}
							title='цвет шрифта'
						/>
						<div style={{ height: '20px' }}></div>
						<Separator />
						<div style={{ height: '20px' }}></div>
						<Select
							selected={backgroundColors[0]}
							options={backgroundColors}
							title='цвет фона'
						/>
						<div style={{ height: '50px' }}></div>
						<Select
							selected={contentWidthArr[0]}
							options={contentWidthArr}
							title='ширина контента'
						/>
						<div style={{ height: '150px' }}></div>
						<div className={clsx(styles.bottomContainer)}>
							<Button title='Сбросить' type='reset' />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			)}
		</div>
	);
};
