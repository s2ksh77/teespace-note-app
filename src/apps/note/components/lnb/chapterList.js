import React, { useEffect } from "react";
import useStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import ChapterColor from "../chapter/chapterColor";
import ChapterText from "../chapter/chapterText";
import PageContainer from "../page/page";
import {
    ChapterContainerUl,
    ChapterUlDIV,
  } from "../../styles/chpaterStyle";

const ChapterList = () => {
    const { NoteStore, ChapterStore, PageStore } = useStore();
    
    useEffect(() => {
        (async () => {
            if (ChapterStore.chapterList.length === 0) {
                await ChapterStore.getChapterList();
                if (ChapterStore.chapterList.length === 0) {NoteStore.setShowPage(false);return null;}
                NoteStore.setShowPage(true);
                const chapterId = ChapterStore.chapterList[0]?.id;
                const pageId = ChapterStore.chapterList[0]?.children?.[0]?.id;
                ChapterStore.setCurrentChapterId(chapterId)            
                PageStore.setCurrentPageId(pageId);
            }
        })()
    },[]) 
  
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

    return useObserver(() => (
      <>
        {ChapterStore.chapterList.length > 0 && ChapterStore.chapterList.map((item) => (           
          <ChapterContainerUl id={item.id} key={item.id} itemType="chapter">
            <ChapterUlDIV
              onClick={onClickChapterBtn.bind(null, item.id, item.children)}
            >
              <ChapterColor color={item.color} chapterId={item.id} />
              <ChapterText 
                text={item.text} chapterId={item.id} />
            </ChapterUlDIV>
            <PageContainer
              children={JSON.stringify(item.children)}
              chapterId={item.id}
            />
          </ChapterContainerUl>
        ))}
      </>
    ));
  };
export default ChapterList;