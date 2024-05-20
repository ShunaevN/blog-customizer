import { CSSProperties, useState } from 'react';
import { Article } from '../../components/article/Article';
import { ArticleParamsForm } from '../../components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [appParamsState, setAppParamsState] = useState(defaultArticleState);
	return (
		<div
			className={styles.main}
			style={
				{
					'--font-family': appParamsState.fontFamilyOption.value,
					'--font-size': appParamsState.fontSizeOption.value,
					'--font-color': appParamsState.fontColor.value,
					'--container-width': appParamsState.contentWidth.value,
					'--bg-color': appParamsState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setFormParamsState={setAppParamsState} />
			<Article />
		</div>
	);
};
