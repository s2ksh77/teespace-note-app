import React, { useMemo, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { StyledCollapse } from '../../styles/tagStyle';
import TagStore from '../../store/tagStore';
import LoadingImg from '../../assets/Tee_loading.gif';
import { Panel, TagKeyRow } from '../../styles/tagStyle';
import TagKeyContainer from './tagKeyContainer';

const TagContentContainer = () => {
	const imgcontainer = useMemo(() => ({ width: "5rem", margin: "auto" }), []);
	let categoryInfo = { "KOR": "ㄱ ~ ㅎ", "ENG": "A ~ Z", "NUM": "0 ~ 9", "ETC": "기타" };

	const targetList = useObserver(() => {
		if (TagStore.isSearching) {
			return TagStore.searchResult;
		} else {
			return TagStore.sortedTagList;
		}
	})

	return useObserver(() => (
		<>
			{(Object.keys(targetList).length > 0) ?
				(<StyledCollapse defaultActiveKey={['1', '2', '3', '4']}>
					{Object.keys(targetList).map((category, idx) => {
						return (
							// "ㄱ~ㅎ"
							<Panel header={categoryInfo[category]} key={String(idx + 1)} >
								{Object.keys(targetList[category])?.map((tagKey) => {
									// "ㄱ", "ㄴ" ...       
									return (
										<TagKeyRow key={tagKey}>
											<div>{tagKey}</div>
											<TagKeyContainer category={category} tagKey={tagKey} />
										</TagKeyRow>
									)
								})}
							</Panel>
						)
					})}
				</StyledCollapse>)
				: <div>검색 결과가 없습니다</div>}

		</>
	))
}

export default TagContentContainer;