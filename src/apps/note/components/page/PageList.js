import React from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../../store/useStore';
import { useDrop } from 'react-dnd';
import Page from './Page';
import { NewPage, NewPageBtn, NewPageText } from '../../styles/pageStyle';

const PageList = ({ children, chapterId, chapterIdx }) => {
  const { NoteStore, PageStore } = useStore();

  const [, drop] = useDrop({
    accept: 'page',
    drop: () => {
      PageStore.movePage(chapterId, chapterIdx, children, children.length);
    },
  });

  const handleNewBtnClick = async targetId => {
    PageStore.setCreatePageParent(targetId);
    await PageStore.createPage();
    NoteStore.setShowPage(true);
  };

  const onDragEnterPage = (enterPageIdx) => {
    if (!PageStore.isMovingPage) return; // 챕터를 드래그하고 있는 경우

    PageStore.setDragEnterPageIdx(enterPageIdx);
    PageStore.setDragEnterChapterIdx(chapterIdx);
  };

  const onDropPage = (targetPageIdx) => {
    if (!PageStore.isMovingPage) return;

    PageStore.setMoveTargetPageList(children);
    PageStore.setMoveTargetPageIdx(targetPageIdx);
    PageStore.movePage(chapterId, chapterIdx);
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
      <NewPage
        ref={drop}
        className={'page-li'}
        onDragOver={e => e.preventDefault()}
      >
        <NewPageBtn onClick={handleNewBtnClick.bind(null, chapterId)}>
          <NewPageText>+ 새 페이지 추가</NewPageText>
        </NewPageBtn>
      </NewPage>
    </>
  ));
};

export default PageList;
