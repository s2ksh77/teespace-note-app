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
            console.log('test')
            if (ChapterStore.chapterList.length === 0) {
                await ChapterStore.getChapterList();
                if (ChapterStore.chapterList.length === 0) {NoteStore.showPage = false;return null;}
                NoteStore.showPage = true;
                const firstChapter = ChapterStore.chapterList[0];
                const firstPage = firstChapter?.children?.[0];
                if (firstChapter) ChapterStore.setCurrentChapterId(firstChapter.id)            
                if (firstPage) PageStore.setCurrentPageId(firstPage.id);
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
                className={(item.id === ChapterStore.currentChapterId) ? "selectedMenu" : ""} 
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