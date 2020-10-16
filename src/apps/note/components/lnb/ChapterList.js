import React, { useEffect } from "react";
import useStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import ChapterColor from "../chapter/ChapterColor";
import ChapterText from "../chapter/ChapterText";
import PageList from "../page/PageList";
import {
  ChapterContainer,
  Chapter,
  ChapterTextInput,
} from "../../styles/chpaterStyle";
import PageStore from "../../store/pageStore";

const ChapterList = ({ type }) => {
  const { NoteStore, ChapterStore, PageStore, TagStore } = useStore();

  useEffect(() => {
    (async () => {
      if (ChapterStore.chapterList.length === 0) {
        await ChapterStore.getChapterList();
        if (ChapterStore.chapterList.length === 0) { NoteStore.setShowPage(false); return null; }
        NoteStore.setShowPage(true);
        const chapterId = ChapterStore.chapterList[0]?.id;
        const pageId = ChapterStore.chapterList[0]?.children?.[0]?.id;
        ChapterStore.setCurrentChapterId(chapterId)
        await PageStore.setCurrentPageId(pageId);
      }
    })()
  }, [])

  const onClickChapterBtn = async (id, children) => {
    if (PageStore.isEdit) return;
    ChapterStore.setCurrentChapterId(id);
    let targetPage = "";
    if (children.length) {
      targetPage = children[0]?.id;
    }
    NoteStore.setShowPage(true);
    await PageStore.setCurrentPageId(targetPage);
  };

  const handleChapterName = (e) => {
    const {
      target: { value },
    } = e;
    ChapterStore.setRenameChapterText(value);
  };

  const handleChapterTextInput = (isEscape, color) => {
    if (!isEscape && ChapterStore.isValidChapterText(ChapterStore.renameChapterText)) {
      ChapterStore.renameChapter(color);
    }
    ChapterStore.setRenameChapterId('');
    NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
  };

  const handleFocus = (e) => e.target.select();

  const onDragEnterChapterContainer = (enterChapterIdx) => {
    if (ChapterStore.moveChapterIdx === '') return;
    
    ChapterStore.setDragEnterChapterIdx(enterChapterIdx);
  };

  const onDragEnterChapter = (enterChapterIdx) => {
    if (!PageStore.movePageId) return;

    PageStore.setDragEnterPageIdx(0);
    PageStore.setDragEnterChapterIdx(enterChapterIdx);
  };

  const onDropPage = (chapterId, chapterIdx, childrenList) => {
    if (!PageStore.movePageId) return; // 챕터를 드래그하고 있는 경우
    
    PageStore.setMoveTargetPageList(childrenList);
    PageStore.setMoveTargetPageIdx(0);
    PageStore.movePage(chapterId, chapterIdx);
  };

  const onDropChapter = (chapterIdx) => {
    if (ChapterStore.moveChapterIdx === '') return;

    ChapterStore.moveChapter(chapterIdx);
  };

  const removeDropLine = () => {
    PageStore.setDragEnterPageIdx('');
    PageStore.setDragEnterChapterIdx('');
    ChapterStore.setDragEnterChapterIdx('');
  };

  return useObserver(() => (
    <>
      {ChapterStore.chapterList.length > 0 && ChapterStore.chapterList.map((item, index) => (
        <ChapterContainer
          className={ChapterStore.dragEnterChapterIdx === index ? 'borderTopLine' : ''}
          id={item.id}
          key={item.id}
          itemType="chapter"
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={onDragEnterChapterContainer.bind(null, index)}
          onDrop={onDropChapter.bind(null, index)}
          onDragEnd={removeDropLine}
        >
          <Chapter
            onClick={onClickChapterBtn.bind(null, item.id, item.children)}
            draggable='true'
            onDragStart={() => ChapterStore.setMoveChapterIdx(index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={onDragEnterChapter.bind(null, index)}
            onDrop={onDropPage.bind(null, item.id, index, item.children)}
          >
            <ChapterColor color={item.color} chapterId={item.id} />
            {ChapterStore.getRenameChapterId() === item.id ? (
              <ChapterTextInput
                maxLength="200"
                value={ChapterStore.renameChapterText}
                onClick={(e) => e.stopPropagation()}
                onChange={handleChapterName}
                onBlur={handleChapterTextInput.bind(null, false, item.color)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { handleChapterTextInput(false, item.color); }
                  else if (e.key === "Escape") { handleChapterTextInput(true, item.color); }
                }}
                onFocus={handleFocus}
                autoFocus={true}
              />
            ) : (
                <ChapterText
                  text={item.text} chapterId={item.id} color={item.color} />
              )
            }
          </Chapter>
          <PageList
            children={JSON.stringify(item.children)}
            chapterId={item.id}
            chapterIdx={index}
          />
        </ChapterContainer>
      ))
      }
    </>
  ));
};
export default ChapterList;