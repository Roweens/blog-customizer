import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select';
import { FormEvent, useRef, useState } from 'react';
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
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	onSubmit: (newArticleState: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { onSubmit, onReset } = props;

	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);

	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);

	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);

	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);

	const onSubmitHandle = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newArticleParams: ArticleStateType = {
			backgroundColor,
			contentWidth,
			fontColor,
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
		};

		onSubmit(newArticleParams);
	};

	const onResetHandle = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);

		onReset();
	};

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={() => setIsOpen((prev) => !prev)} isOpen={isOpen} />
			<aside className={clsx(styles.container, isOpen && styles.containerOpen)}>
				<form
					className={styles.form}
					onSubmit={onSubmitHandle}
					onReset={onResetHandle}>
					<Select
						title='Шрифт'
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={setFontFamily}
					/>
					<RadioGroup
						name='FontSize'
						options={fontSizeOptions}
						selected={fontSize}
						title='Размер шрифта'
						onChange={setFontSize}
					/>
					<Select
						title='Цвет шрифта'
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
					/>
					<Select
						title='Ширина контента'
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
