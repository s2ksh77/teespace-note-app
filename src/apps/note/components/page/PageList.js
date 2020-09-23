import React from "react";
import { useObserver } from "mobx-react";
import {
  Page,
  PageMargin,
  PageTextCover,
  PageText,
  NewPage,
  NewPageBtn,
  NewPageText,
} from "../../styles/pageStyle";
import ContextMenu from "../common/ContextMenu";
import useStore from "../../store/useStore";

const PageList = ({ children, chapterId }) => {
  const childrenList = JSON.parse(children);
  const { NoteStore, ChapterStore, PageStore, TagStore } = useStore();

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
          <PageMargin />
          <PageTextCover>
            <PageText>{item.text}</PageText>
            <ContextMenu
              type={"page"}
              chapterId={chapterId}
              pageId={item.id}
            />
          </PageTextCover>
        </Page>
      ))}
      <NewPage className={"page-li"}>
        <NewPageBtn onClick={handleNewBtnClick.bind(null, chapterId)}>
          <NewPageText>+ 새 페이지 추가</NewPageText>
        </NewPageBtn>
      </NewPage>
    </>
  ));
};

export default PageList;
