import React, { useMemo } from 'react';
import { useObserver } from 'mobx-react';
import useStore from "../../store/useStore";
import { TagChip, TagChipText, TagChipNum } from '../../styles/tagStyle';

// "ㄱ", ["가나다", "고교구"]
const TagKeyChildren = ({ category, tagKey }) => {
	const { ChapterStore, TagStore } = useStore();

	const onClickTagBtn = async (tagId, tagName, e) => {
		// 임시 (태그칩 모양으로 넣어야함)
		await TagStore.getTagNoteList(tagId);
		ChapterStore.setTargetSearchTagName(tagName);
		ChapterStore.setIsTagSearching(true)
	}

	const style = useMemo(() => ({ display: "flex", width: "100%" }), []);

	return useObserver(() => (
		<>
			<div style={style}>
				{Object.keys(TagStore.targetTagList[category][tagKey]).map((tagName) => {
					const tagInfo = TagStore.targetTagList[category][tagKey][tagName];
					return (
						<TagChip onClick={onClickTagBtn.bind(null, tagInfo.id, tagName)} key={tagInfo.id}>
							<TagChipText>{tagName}</TagChipText>
							<TagChipNum>{tagInfo.note_id.length}</TagChipNum>
						</TagChip>
					)
				})}
			</div>
		</>
	));
}

export default TagKeyChildren;