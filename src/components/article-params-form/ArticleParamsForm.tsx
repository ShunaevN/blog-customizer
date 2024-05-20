import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';
import { Text } from '../text';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	setFormParamsState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setFormParamsState,
}: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const [fontFamilyOption, setFontFamilyOption] = useState(
		defaultArticleState.fontFamilyOption
	);

	const [fontSizeOption, setFontSizeOption] = useState(
		defaultArticleState.fontSizeOption
	);

	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);

	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);

	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const changeOpenState = () => {
		setIsOpen(!isOpen);
	};

	const toggleSidebarByClick = (event: MouseEvent) => {
		const el = event.target as HTMLElement;
		if (
			isOpen &&
			!formRef.current?.contains(event.target as Node) &&
			!(el?.tagName === 'LI')
		) {
			setIsOpen(false);
		}
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		setFormParamsState({
			fontFamilyOption: fontFamilyOption,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSizeOption,
		});
	};

	const handleResetform = () => {
		setFormParamsState({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontFamilyOption,
		});
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSizeOption(defaultArticleState.fontFamilyOption);
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('click', toggleSidebarByClick);
		}
		return () => document.removeEventListener('click', toggleSidebarByClick);
	}, [isOpen]);

	return (
		<div ref={formRef}>
			<ArrowButton isOpen={isOpen} setIsOpen={changeOpenState} />

			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						selected={fontFamilyOption}
						options={fontFamilyOptions}
						onChange={setFontFamilyOption}
						title='шрифт'
					/>
					<Text weight={800} size={18} uppercase={true}>
						размер шрифта
					</Text>
					<div className={styles.bottomContainer}>
						<Button
							title='18 PX'
							onClick={() => {
								setFontSizeOption(fontSizeOptions[0]);
							}}
						/>
						<Button
							title='25 PX'
							onClick={() => {
								setFontSizeOption(fontSizeOptions[1]);
							}}
						/>
						<Button
							title='38 PX'
							onClick={() => {
								setFontSizeOption(fontSizeOptions[2]);
							}}
						/>
					</div>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
						title='цвет фона'
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleResetform} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
