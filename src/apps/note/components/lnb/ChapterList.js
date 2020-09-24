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

const ChapterList = ({ type }) => {
  const { NoteStore, ChapterStore, PageStore } = useStore();

  useEffect(() => {
    (async () => {
      if (ChapterStore.chapterList.length === 0) {
        await ChapterStore.getChapterList();
        if (ChapterStore.chapterList.length === 0) { NoteStore.setShowPage(false); return null; }
        NoteStore.setShowPage(true);
        const chapterId = ChapterStore.chapterList[0]?.id;
        const pageId = ChapterStore.chapterList[0]?.children?.[0]?.id;
        ChapterStore.setCurrentChapterId(chapterId)
        PageStore.setCurrentPageId(pageId);
      }
    })()
  }, [])

  const onClickChapterBtn = async (id, children) => {
    ChapterStore.setCurrentChapterId(id);
    let targetPage = "";
    if (children.length) {
      targetPage = children[0]?.id;
    }
    PageStore.setCurrentPageId(targetPage);
    await PageStore.getNoteInfoList(targetPage);
    NoteStore.setShowPage(true);
  };

  const handleChapterName = (e) => {
    const {
      target: { value },
    } = e;
    ChapterStore.setRenameChapterText(value);
  };

  const handleChapterTextInput = (color) => {
    if (ChapterStore.isValidChapterText(ChapterStore.renameChapterText)) {
      ChapterStore.renameChapter(color);
    }
    ChapterStore.setRenameChapterId('');
  };

  const handleFocus = (e) => e.target.select();

  return useObserver(() => (
    <>
      {ChapterStore.chapterList.length > 0 && ChapterStore.chapterList.map((item) => (
        <ChapterContainer id={item.id} key={item.id} itemType="chapter">
          <Chapter
            onClick={onClickChapterBtn.bind(null, item.id, item.children)}
          >
            <ChapterColor color={item.color} chapterId={item.id} />
            {ChapterStore.getRenameChapterId() === item.id ? (
                <ChapterTextInput 
                  maxLength="200"
                  value={ChapterStore.renameChapterText}
                  onChange={handleChapterName}
                  onBlur={handleChapterTextInput.bind(null, item.color)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") { handleChapterTextInput(item.color); }
                    else if (e.key === "Escape") { ChapterStore.setRenameChapterId(''); }
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
          />
        </ChapterContainer>
      ))}
    </>
  ));
};
export default ChapterList;