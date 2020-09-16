import React from "react";
import { useObserver } from "mobx-react";
import {
  PageList,
  PageliIcon,
  PageTextCover,
  PageText,
  PageEllipsis,
  NewPageSpan,
  NewPageBlock,
  NewPageBtn,
} from "../../styles/pageStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import useStore from "../../store/useStore";

const PageContainer = ({ children, chapterId }) => {
  const childrenList = JSON.parse(children);
  const { NoteStore, ChapterStore, PageStore, TagStore } = useStore();

  const selectPage = async (targetId) => {
    await PageStore.getNoteInfoList(targetId);
    await TagStore.getNoteTagList(targetId);
  };

  const handleNewBtnClick = (targetId) => {
    PageStore.setCreatePageParent(targetId);
    PageStore.createPage();
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
        <PageList
          key={item.id}
          id={item.id}
          className={
            "page-li" + ((NoteStore.showPage && (item.id === PageStore.currentPageId)) ? " selected" : "")
          }
          onClick={onClickLnbPage.bind(null, item.id)}
        >
          <PageliIcon />
          <PageTextCover>
            <PageText>{item.text}</PageText>
            <PageEllipsis className="ellipsisBtn">
              <FontAwesomeIcon icon={faEllipsisV} size={"1x"} />
            </PageEllipsis>
          </PageTextCover>
        </PageList>
      ))}
      <NewPageSpan className={"page-li"}>
        <NewPageBlock onClick={handleNewBtnClick.bind(null, chapterId)}>
          <NewPageBtn>+ 새 페이지 추가</NewPageBtn>
        </NewPageBlock>
      </NewPageSpan>
    </>
  ));
};

export default PageContainer;
