import React from "react";
import { useObserver } from "mobx-react";
import {
  Page,
  PageMargin,
  PageTextCover,
  PageText,
  PageTextInput,
  NewPage,
  NewPageBtn,
  NewPageText,
} from "../../styles/pageStyle";
import ContextMenu from "../common/ContextMenu";
import useStore from "../../store/useStore";

const PageList = ({ children, chapterId, chapterIdx }) => {
  const childrenList = JSON.parse(children);
  const { NoteStore, ChapterStore, PageStore, TagStore } = useStore();

  const handleNewBtnClick = async (targetId) => {
    PageStore.setCreatePageParent(targetId);
    await PageStore.createPage();
    NoteStore.setShowPage(true);
  };
  const onClickLnbPage = async (id) => {
    NoteStore.setShowPage(true);
    ChapterStore.setCurrentChapterId(chapterId);
    await PageStore.setCurrentPageId(id);
    if (NoteStore.layoutState === 'collapse') NoteStore.setTargetLayout('Content');
  };

  const handlePageName = (e) => {
    const {
      target: { value },
    } = e;
    PageStore.setRenamePageText(value);
  };

  const handlePageTextInput = (isEscape) => {
    if (!isEscape) {
      PageStore.renamePage(chapterId);
      PageStore.setIsRename(false);
    }

    PageStore.setRenamePageId('');
    NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
  };

  const handleFocus = (e) => e.target.select();

  const onDragStartPage = (pageId, pageIdx) => {
    PageStore.setIsMovingPage(true);
    PageStore.setMovePageId(pageId);
    PageStore.setMovePageIdx(pageIdx);
    PageStore.setMoveChapterId(chapterId);
  };

  const onDragEnterPage = (enterPageIdx) => {
    if (!PageStore.isMovingPage) return; // 챕터를 드래그하고 있는 경우

    PageStore.setDragEnterPageIdx(enterPageIdx);
    PageStore.setDragEnterChapterIdx(chapterIdx);
  };

  const onDropPage = (targetPageIdx) => {
    if (!PageStore.isMovingPage) return;
    
    PageStore.setMoveTargetPageList(childrenList);
    PageStore.setMoveTargetPageIdx(targetPageIdx);
    PageStore.movePage(chapterId, chapterIdx);
  };

  return useObserver(() => (
    <>
      {childrenList.map((item, index) => (
        <Page
          key={item.id}
          id={item.id}
          className={
            "page-li" + ((NoteStore.showPage && (item.id === PageStore.currentPageId)) ? " selected" : "")
          }
          onClick={onClickLnbPage.bind(null, item.id)}
          draggable='true'
          onDragStart={onDragStartPage.bind(null, item.id, index)}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={onDragEnterPage.bind(null, index)}
          onDrop={onDropPage.bind(null, index)}
        >
          <PageMargin style={(item.id === PageStore.getRenamePageId()) && PageStore.isRename ? { background: "#ffffff" } : { background: "unset" }} />
          {PageStore.getRenamePageId() === item.id ? (
            <PageTextCover style={(item.id === PageStore.getRenamePageId()) && PageStore.isRename ? { background: "#ffffff" } : { background: "unset" }}>
              <PageTextInput
                maxLength="200"
                value={PageStore.renamePageText}
                onClick={(e) => e.stopPropagation()}
                onChange={handlePageName}
                onBlur={handlePageTextInput.bind(null, false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { handlePageTextInput(false); }
                  else if (e.key === "Escape") { handlePageTextInput(true); }
                }}
                onFocus={handleFocus}
                autoFocus={true}
              />
            </PageTextCover>
          ) : (
              <PageTextCover className={
                PageStore.dragEnterChapterIdx !== chapterIdx ? '' : (
                  PageStore.dragEnterPageIdx === index ? 'borderTopLine' : (
                    childrenList.length - 1 === index && PageStore.dragEnterPageIdx === childrenList.length ? 'borderBottomLine' : ''
                  )
                )}
              >
                <PageText>{item.text}</PageText>
                <ContextMenu
                  type={"page"}
                  chapterId={chapterId}
                  pageId={item.id}
                  pageTitle={item.text}
                  nextSelectablePageId={
                    childrenList.length > 1 ? (
                      childrenList[0].id === item.id ? childrenList[1].id : childrenList[0].id
                    ) : ("")
                  }
                />
              </PageTextCover>
            )}
        </Page>
      ))
      }
      <NewPage
        className={"page-li"}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={onDragEnterPage.bind(null, childrenList.length)}
        onDrop={onDropPage.bind(null, childrenList.length)}
      >
        <NewPageBtn onClick={handleNewBtnClick.bind(null, chapterId)}>
          <NewPageText>+ 새 페이지 추가</NewPageText>
        </NewPageBtn>
      </NewPage>
    </>
  ));
};

export default PageList;
