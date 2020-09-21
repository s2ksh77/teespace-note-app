import React, { useMemo, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { StyledCollapse } from '../../styles/tagStyle';
import TagStore from '../../store/tagStore';
import LoadingImg from '../../assets/Tee_loading.gif';
import { Panel, TagKeyContainer } from '../../styles/tagStyle';
import TagKeyChildren from './TagKeyChildren';
import SearchResultNotFound from '../common/SearchResultNotFound';

const TagContentContainer = () => {
	const imgcontainer = useMemo(() => ({ width: "5rem", margin: "auto" }), []);
	let categoryInfo = { "KOR": "ㄱ ~ ㅎ", "ENG": "A ~ Z", "NUM": "0 ~ 9", "ETC": "기타" };
	
	return useObserver(() => (
		<>
			{(Object.keys(TagStore.targetTagList).length > 0) ?
				(<StyledCollapse defaultActiveKey={['1', '2', '3', '4']}>
					{Object.keys(TagStore.targetTagList).map((category, idx) => {
						return (
							// "ㄱ~ㅎ"
							<Panel header={categoryInfo[category]} key={String(idx + 1)} >
								{Object.keys(TagStore.targetTagList[category])?.map((tagKey) => {
									// "ㄱ", "ㄴ" ...       
									return (
										<TagKeyContainer key={tagKey}>
											<div>{tagKey}</div>
											<TagKeyChildren category={category} tagKey={tagKey} />
										</TagKeyContainer>
									)
								})}
							</Panel>
						)
					})}
				</StyledCollapse>)
				:
				(<SearchResultNotFound />)
			}
		</>
	))
}

export default TagContentContainer;