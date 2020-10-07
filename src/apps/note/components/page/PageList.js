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

  const handlePageTextInput = () => {
    PageStore.renamePage(chapterId);
    PageStore.setRenamePageId('');
    PageStore.setIsRename(false);
  };

  const handleFocus = (e) => e.target.select();

  const onDropPage = (targetPageIdx) => {
    if (!PageStore.moveChapterId) return;

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
          onDragStart={() => {
            PageStore.setMovePageId(item.id);
            PageStore.setMovePageIdx(index);
            PageStore.setMoveChapterId(chapterId);
          }}
          onDragOver={(e) => e.preventDefault()}
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
                onBlur={handlePageTextInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { handlePageTextInput(); }
                  else if (e.key === "Escape") { PageStore.setRenamePageId(''); }
                }}
                onFocus={handleFocus}
                autoFocus={true}
              />
            </PageTextCover>
          ) : (
              <PageTextCover>
                <PageText>{item.text}</PageText>
                <ContextMenu
                  type={"page"}
                  chapterId={chapterId}
                  pageId={item.id}
                  pageTitle={item.text}
                  nextSelectablePageId={
                    childrenList.length > 1 ? (
                      childrenList[0]?.id === item.id ? childrenList[1]?.id : childrenList[0]?.id
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
