import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useRef, useCallback } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const articleWrapperRef = useRef<HTMLDivElement>(null);

	const setArticleParams = useCallback((articleParams: ArticleStateType) => {
		if (articleWrapperRef.current) {
			articleWrapperRef.current.style.setProperty(
				'--font-family',
				articleParams.fontFamilyOption.value
			);

			articleWrapperRef.current.style.setProperty(
				'--font-size',
				articleParams.fontSizeOption.value
			);

			articleWrapperRef.current.style.setProperty(
				'--font-color',
				articleParams.fontColor.value
			);

			articleWrapperRef.current.style.setProperty(
				'--container-width',
				articleParams.contentWidth.value
			);

			articleWrapperRef.current.style.setProperty(
				'--bg-color',
				articleParams.backgroundColor.value
			);
		}
	}, []);

	const onArticleParamsChange = useCallback(
		(newArticleState: ArticleStateType) => {
			setArticleParams(newArticleState);
		},
		[setArticleParams]
	);

	const onArticleParamsReset = useCallback(() => {
		setArticleParams(defaultArticleState);
	}, [setArticleParams]);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}
			ref={articleWrapperRef}>
			<ArticleParamsForm
				onSubmit={onArticleParamsChange}
				onReset={onArticleParamsReset}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
