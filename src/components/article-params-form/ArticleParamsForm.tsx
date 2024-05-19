import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';
import { Text } from '../text';
import { Select } from '../select';
import {
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

type formParamsType = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};

type FormParamsStatePropsType = {
	setFormParamsState: (params: formParamsType) => void;
};

type ValuesType = {
	font: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	widthArr: OptionType;
	fontSize: OptionType;
};

export const ArticleParamsForm = ({
	setFormParamsState,
}: FormParamsStatePropsType) => {
	const formRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const [font, setFont] = useState(fontFamilyOptions[0]);
	const handleChangeFont = (selected: OptionType) => {
		setFont(selected);
	};

	const [fontSize, setFontSize] = useState(fontSizeOptions[0]);

	const [fontColor, setFontColor] = useState(fontColors[0]);
	const handleChangeFontColor = (selected: OptionType) => {
		setFontColor(selected);
	};

	const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
	const handleChangeBackgroundColor = (selected: OptionType) => {
		setBackgroundColor(selected);
	};

	const [widthArr, setWidthArr] = useState(contentWidthArr[0]);
	const handleChangeWidthArr = (selected: OptionType) => {
		setWidthArr(selected);
	};
	const changeOpenState = () => {
		setIsOpen(!isOpen);
	};

	const toggleSidebarByClick = (event: MouseEvent) => {
		if (isOpen && !formRef.current?.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
	};

	const values = {
		font,
		fontSize,
		fontColor,
		backgroundColor,
		widthArr,
	};

	const setAllValues = (values: ValuesType) => {
		setFormParamsState({
			fontFamilyOption: values.font,
			fontColor: values.fontColor,
			backgroundColor: values.backgroundColor,
			contentWidth: values.widthArr,
			fontSizeOption: values.fontSize,
		});
	};

	const handleSubmitform = () => {
		setAllValues(values);
	};

	const handleResetform = () => {
		setFormParamsState({
			fontFamilyOption: fontFamilyOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
			fontSizeOption: fontSizeOptions[0],
		});
		setFont(fontFamilyOptions[0]);
		setFontColor(fontColors[0]);
		setBackgroundColor(backgroundColors[0]);
		setWidthArr(contentWidthArr[0]);
		setFontSize(fontSizeOptions[0]);
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
							selected={font}
							options={fontFamilyOptions}
							onChange={handleChangeFont}
							title='шрифт'
						/>
						<div style={{ height: '50px' }}></div>
						<Text weight={800} size={18} uppercase={true}>
							размер шрифта
						</Text>
						<div className={styles.bottomContainer}>
							<Button
								title='18 PX'
								onClick={() => {
									setFontSize(fontSizeOptions[0]);
								}}
							/>
							<Button
								title='25 PX'
								onClick={() => {
									setFontSize(fontSizeOptions[1]);
								}}
							/>
							<Button
								title='38 PX'
								onClick={() => {
									setFontSize(fontSizeOptions[2]);
								}}
							/>
						</div>
						<div style={{ height: '50px' }}></div>
						<Select
							selected={fontColor}
							options={fontColors}
							onChange={handleChangeFontColor}
							title='цвет шрифта'
						/>
						<div style={{ height: '20px' }}></div>
						<Separator />
						<div style={{ height: '20px' }}></div>
						<Select
							selected={backgroundColor}
							options={backgroundColors}
							onChange={handleChangeBackgroundColor}
							title='цвет фона'
						/>
						<div style={{ height: '50px' }}></div>
						<Select
							selected={widthArr}
							options={contentWidthArr}
							onChange={handleChangeWidthArr}
							title='ширина контента'
						/>
						<div style={{ height: '150px' }}></div>
						<div className={clsx(styles.bottomContainer)}>
							<Button title='Сбросить' type='reset' onClick={handleResetform} />
							<Button
								title='Применить'
								type='submit'
								onClick={handleSubmitform}
							/>
						</div>
					</form>
				</aside>
			)}
		</div>
	);
};
