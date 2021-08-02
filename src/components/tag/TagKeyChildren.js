import React, { useState } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { Tooltip } from 'antd';
import {
  TagChipGroup,
  TagChip,
  TagText,
  TagChipNum,
} from '../../styles/tagStyle';
import NoteUtil from '../../NoteUtil';
import { logEvent } from 'teespace-core';

// "ㄱ", ["가나다", "고교구"]
const TagKeyChildren = ({ category, tagKey }) => {
  const { NoteStore, ChapterStore, TagStore } = useNoteStore();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  const onClickTagBtn = (tagId, tagName) => async () => {
    ChapterStore.setIsTagSearching(true);
    ChapterStore.setIsSearching(true);
    // lnb search창에 검색 시도(클릭)한 태그이름 나오고 검색 실행중 화면 보이기
    ChapterStore.setSearchingTagName(tagName);
    // isTagSearching이고 isLoadingSearchResult일 때 검색 실행중 화면이 보인다
    ChapterStore.setIsLoadingSearchResult(true);
    await TagStore.setTagNoteSearchResult(tagName);
    ChapterStore.setIsLoadingSearchResult(false);
    if (NoteStore.layoutState === 'collapse') {
      NoteStore.setTargetLayout('LNB');
    }
    logEvent('note', 'clickTagBtn');
  };
  const handleTooltip = e => {
    setIsEllipsisActive(
      e.currentTarget.offsetWidth < e.currentTarget.scrollWidth,
    );
  };
  return useObserver(() => (
    <>
      <TagChipGroup>
        {Object.keys(TagStore.sortedTagList[category][tagKey]).map(tagName => {
          tagName = NoteUtil.decodeStr(tagName);
          const tagInfo = TagStore.sortedTagList[category][tagKey][tagName];
          return (
            <Tooltip key={tagInfo.id} title={isEllipsisActive ? tagName : null}>
              <TagChip
                onClick={onClickTagBtn(tagInfo.id, tagName)}
                key={tagInfo.id}
              >
                <TagText onMouseOver={handleTooltip}>{tagName}</TagText>
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
