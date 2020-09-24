import React, { useRef } from "react";
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

const PageList = ({ children, chapterId }) => {
  const childrenList = JSON.parse(children);
  const { NoteStore, ChapterStore, PageStore, TagStore } = useStore();
  const inputRef = useRef();

  const selectPage = async (targetId) => {
    await PageStore.getNoteInfoList(targetId);
    await TagStore.getNoteTagList(targetId);
  };

  const handleNewBtnClick = async (targetId) => {
    PageStore.setCreatePageParent(targetId);
    await PageStore.createPage();
    NoteStore.setShowPage(true);
  };
  const onClickLnbPage = (id) => {
    NoteStore.setShowPage(true);
    selectPage(id);
    ChapterStore.setCurrentChapterId(chapterId);
    PageStore.setCurrentPageId(id)
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

  const handleInputRef = () => {
    if (PageStore.renameFlag) {
      inputRef.current.select();
      PageStore.setRenameFlag(false);
    }
  };

  return useObserver(() => (
    <>
      {childrenList.map((item) => (
        <Page
          key={item.id}
          id={item.id}
          className={
            "page-li" + ((NoteStore.showPage && (item.id === PageStore.currentPageId)) ? " selected" : "")
          }
          onClick={onClickLnbPage.bind(null, item.id)}
        >
          <PageMargin style={(item.id === PageStore.getRenamePageId()) && PageStore.isRename ? { background: "#ffffff" } : { background: "unset" }} />
          {PageStore.getRenamePageId() === item.id ? (
            <PageTextCover style={(item.id === PageStore.getRenamePageId()) && PageStore.isRename ? { background: "#ffffff" } : { background: "unset" }}>
              <PageTextInput
                ref={inputRef}
                value={PageStore.renamePageText}
                onChange={handlePageName}
                onBlur={handlePageTextInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { handlePageTextInput(); }
                  else if (e.key === "Escape") { PageStore.setRenamePageId(''); }
                }}
                onSelect={handleInputRef}
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
                />
              </PageTextCover>
            )}
        </Page>
      ))
      }
      <NewPage className={"page-li"}>
        <NewPageBtn onClick={handleNewBtnClick.bind(null, chapterId)}>
          <NewPageText>+ 새 페이지 추가</NewPageText>
        </NewPageBtn>
      </NewPage>
    </>
  ));
};

export default PageList;
