import React, { useMemo } from 'react';
import { useObserver } from 'mobx-react';
import TagStore from '../../store/tagStore';
import { TagChip, TagChipText, TagChipNum } from '../../styles/tagStyle';

// "ㄱ", ["가나다", "고교구"]
const TagKeyChildren = ({ category, tagKey }) => {
	const onClickTagBtn = () => {

	}

	const targetList = useObserver(() => ((TagStore.isSearching)
		? TagStore.searchResult[category][tagKey] : TagStore.sortedTagList[category][tagKey]));

	const style = useMemo(() => ({ display: "flex", width: "100%" }), []);

	return useObserver(() => (
		<>
			<div style={style}>
				{Object.keys(targetList)?.map((tagName) => {
					return (
						<TagChip onClick={onClickTagBtn} key={tagName}>
							<TagChipText>{tagName}</TagChipText>
							<TagChipNum>{targetList[tagName].note_id.length}</TagChipNum>
						</TagChip>
					)
				})}
			</div>
		</>
	));
}

export default TagKeyChildren;