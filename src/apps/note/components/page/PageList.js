import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrop } from 'react-dnd';
import Page from './Page';
import { NewPage, NewPageBtn, NewPageText } from '../../styles/pageStyle';

const PageList = ({ children, chapterId, chapterIdx }) => {
  const { NoteStore, PageStore } = useNoteStore();

  const [, drop] = useDrop({
    accept: 'page',
    drop: () => {
      PageStore.movePage(chapterId, chapterIdx, children, children.length);
    },
    hover() {
      if (PageStore.dragEnterChapterIdx !== chapterIdx)
        PageStore.setDragEnterChapterIdx(chapterIdx);
      if (PageStore.dragEnterPageIdx !== children.length)
        PageStore.setDragEnterPageIdx(children.length);
    },
  });

  const handleNewBtnClick = async targetId => {
    PageStore.setCreatePageParent(targetId);
    PageStore.setCreatePageParentIdx(chapterIdx);
    await PageStore.createPage();
    NoteStore.setShowPage(true);
  };

  return useObserver(() => (
    <>
      {children.map((item, index) => (
        <Page
          key={item.id}
          page={item}
          index={index}
          children={children}
          chapterId={chapterId}
          chapterIdx={chapterIdx}
        />
      ))}
      <div style={{ height: '0px', marginLeft: '1.875rem' }}
        className={
          PageStore.dragEnterChapterIdx === chapterIdx &&
            PageStore.dragEnterPageIdx === children.length
            ? 'borderTopLine'
            : ''
        }
      />
      <NewPage
        ref={drop}
        className={'page-li'}
      >
        <NewPageBtn onClick={handleNewBtnClick.bind(null, chapterId)}>
          <NewPageText>+ 새 페이지 추가</NewPageText>
        </NewPageBtn>
      </NewPage>
    </>
  ));
};

export default PageList;
