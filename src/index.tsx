import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [formParamsState, setFormParamsState] = useState(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': formParamsState.fontFamilyOption.value,
					'--font-size': formParamsState.fontSizeOption.value,
					'--font-color': formParamsState.fontColor.value,
					'--container-width': formParamsState.contentWidth.value,
					'--bg-color': formParamsState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setFormParamsState={setFormParamsState} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
