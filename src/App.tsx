import { CSSProperties, useCallback, useRef, useState } from 'react';
import {
	ArticleAppState,
	ArticleStateType,
	MapOptionNameToVariable,
	defaultArticleState,
} from './constants/articleProps';
import styles from './styles/index.module.scss';
import { ArticleParamsForm } from './components/article-params-form';
import { Article } from './components/article';

export const App = () => {
	const articleWrapperRef = useRef<HTMLDivElement>(null);

	const [articleParamsState, setArticleParamsState] = useState<ArticleAppState>(
		{
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
		}
	);

	const setArticleParams = useCallback((articleParams: ArticleStateType) => {
		const newState: ArticleAppState = {} as ArticleAppState;

		Object.entries(articleParams).forEach(([key, { value }]) => {
			const variableName =
				MapOptionNameToVariable[key as keyof ArticleStateType];

			newState[variableName] = value;
		});

		setArticleParamsState(newState);
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
		<main
			className={styles.main}
			style={articleParamsState as CSSProperties}
			ref={articleWrapperRef}>
			<ArticleParamsForm
				onSubmit={onArticleParamsChange}
				onReset={onArticleParamsReset}
			/>
			<Article />
		</main>
	);
};
