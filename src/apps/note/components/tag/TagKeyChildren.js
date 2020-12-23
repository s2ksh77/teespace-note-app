import React, { useState } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { Tooltip } from 'antd';
import { TagChipGroup, TagChip, TagChipText, TagChipNum } from '../../styles/tagStyle';

// "ㄱ", ["가나다", "고교구"]
const TagKeyChildren = ({ category, tagKey }) => {
  const { NoteStore, ChapterStore, TagStore } = useNoteStore();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  const onClickTagBtn = (tagId, tagName) => async () => {
    // 임시 (태그칩 모양으로 넣어야함)
    await TagStore.setTagNoteSearchResult(tagId);
    ChapterStore.setSearchingTagName(tagName);
    ChapterStore.setIsTagSearching(true);
    if (NoteStore.layoutState === 'collapse') {
      NoteStore.setTargetLayout('LNB');
    }
  };
  const handleTooltip = (e) => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth)
  }
  return useObserver(() => (
    <>
      <TagChipGroup>
        {Object.keys(TagStore.sortedTagList[category][tagKey]).map(tagName => {
          const tagInfo = TagStore.sortedTagList[category][tagKey][tagName];
          return (
            <Tooltip title={isEllipsisActive ? tagName : null}>
              <TagChip
                onClick={onClickTagBtn(tagInfo.id, tagName)}
                key={tagInfo.id}
              >
                <TagChipText onMouseOver={handleTooltip}>{tagName}</TagChipText>
                <TagChipNum>{tagInfo.note_id.length}</TagChipNum>
              </TagChip>
            </Tooltip>
          );
        })}
      </TagChipGroup>
    </>
  ));
};

export default TagKeyChildren;
