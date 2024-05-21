import { FormEvent, useRef, useState } from 'react';
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
import { RadioGroup } from '../radio-group';
import { useClickOutSidebar } from './hooks/useClickOutSidebar';

type ArticleParamsFormProps = {
	setFormParamsState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setFormParamsState,
}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLDivElement | null>(null);
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
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
		setFontFamilyOption(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSizeOption(defaultArticleState.fontSizeOption);
	};

	useClickOutSidebar({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});
	return (
		<div ref={rootRef}>
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
					<RadioGroup
						name='выбор размера шрифта'
						title='размер шрифта'
						options={fontSizeOptions}
						selected={fontSizeOption}
						onChange={setFontSizeOption}
					/>
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
