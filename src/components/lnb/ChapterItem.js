import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';
import {
  ChapterContainer,
  ChapterWrapper,
  ChapterColor,
  ChapterShareIcon,
  ChapterTitle,
  ChapterTitleInput,
} from '../../styles/ChapterStyle';
import { ButtonWrapper, ButtonIcon } from '../../styles/CommonStyle';
import ContextMenu from './ContextMenu';
import PageList from './PageList';
import sharedPageIcon from '../../assets/page_shared.svg';
import sharedIcon from '../../assets/share_1.svg';
import arrowTopIcon from '../../assets/arrow_top_1.svg';
import arrowBottomIcon from '../../assets/arrow_bottom_1.svg';
import PageModel from '../../stores/model/PageModel';

const ChapterItem = ({ chapter, flexOrder, isShared }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  const handleClickChapter = async () => {
    if (!PageStore.pageModel.isReadMode) return;
    if (chapter.pageList.length > 0) {
      await PageStore.fetchNoteInfoList(chapter.pageList[0].id);
      PageStore.fetchNoteTagList(chapter.pageList[0].id);
    } else {
      PageStore.setPageModel(new PageModel({ chapterId: chapter.id }));
    }
    if (NoteStore.layoutState === 'collapse')
      NoteStore.setTargetLayout('content');
    NoteStore.setIsPageContent(true);
  };

  const ChapterIcon = () => {
    if (chapter.type === 'shared_page')
      return <ChapterShareIcon src={sharedPageIcon} />;
    if (chapter.type === 'shared') return <ChapterShareIcon src={sharedIcon} />;
    return <ChapterColor background={chapter.color} />;
  };

  return useObserver(() => (
    <ChapterContainer order={flexOrder}>
      <ChapterWrapper
        className={
          NoteStore.isPageContent &&
          PageStore.pageModel?.chapterId === chapter.id
            ? 'selectedMenu'
            : ''
        }
        style={{ paddingLeft: isShared ? '2.63rem' : '1.69rem' }}
        onClick={handleClickChapter}
      >
        <ChapterIcon />
        <ChapterTitle>{chapter.name}</ChapterTitle>
        <ContextMenu itemType="chapter" item={chapter} />
        <ButtonWrapper>
          <ButtonIcon src={arrowTopIcon} />
        </ButtonWrapper>
      </ChapterWrapper>
      <PageList page={chapter.pageList} chapterId={chapter.id} />
    </ChapterContainer>
  ));
};

export default ChapterItem;
