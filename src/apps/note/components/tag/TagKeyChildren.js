import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { TagChip, TagChipText, TagChipNum } from '../../styles/tagStyle';

const style = { display: 'flex', width: '100%', flexWrap: 'wrap' };
// "ㄱ", ["가나다", "고교구"]
const TagKeyChildren = ({ category, tagKey }) => {
  const { NoteStore, ChapterStore, TagStore } = useNoteStore();

  const onClickTagBtn = (tagId, tagName) => async () => {
    // 임시 (태그칩 모양으로 넣어야함)
    await TagStore.getTagPagesList(tagId);
    ChapterStore.setSearchingTagName(tagName);
    ChapterStore.setIsTagSearching(true);
    if (NoteStore.layoutState === 'collapse') {
      NoteStore.setTargetLayout('LNB');
    }
  };

  return useObserver(() => (
    <>
      <div style={style}>
        {Object.keys(TagStore.sortedTagList[category][tagKey]).map(tagName => {
          const tagInfo = TagStore.sortedTagList[category][tagKey][tagName];
          return (            
            <TagChip
              onClick={onClickTagBtn(tagInfo.id, tagName)}
              key={tagInfo.id}
            >
              <TagChipText>{tagName}</TagChipText>
              <TagChipNum>{tagInfo.note_id.length}</TagChipNum>
            </TagChip>
          );
        })}
      </div>
    </>
  ));
};

export default TagKeyChildren;
