import React, {useEffect, useRef} from 'react';
import useStore from "../../store/useStore";
import {LNBNewChapter} from "../../styles/lnbStyle";
import { observer } from 'mobx-react';
import ChapterColor from "../chapter/ChapterColor";
import {
  ChapterInput,
  ChapterTitle,
} from "../../styles/chpaterStyle";

const { NoteStore, ChapterStore } = useStore();
const LNBNewChapterForm = observer(({show, createNewChapter}) => {
  // return 전에 hook이 위치해야함
  const titleRef = useRef(null); 

  const handleBlur = async (e) => {
    if (e.relatedTarget && e.relatedTarget.getAttribute('data-btn') === "editorEditBtn") {
      ChapterStore.setChapterTempUl(false); return;
    }
    await createNewChapter();
  }

  const handleTitleInput = ({target:{value}}) => {
    ChapterStore.setChapterTitle(value);
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        createNewChapter();
        break;
      // esc키 누르면 blur이벤트 먼저 타서 create된다
      case "Escape":
        // event.stopPropagation(); // blur무조건 탄다
        ChapterStore.setChapterTempUl(false);
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    const focusCondition = ChapterStore.isNewChapter || !NoteStore.showModal;
    if (titleRef.current && focusCondition) titleRef.current.focus();
  },[ChapterStore.isNewChapter, NoteStore.showModal])

  if (!show) return null;
  return (
    <>
      <LNBNewChapter>
        <ChapterColor color={ChapterStore.isNewChapterColor} />
        <ChapterTitle>
          <ChapterInput
            ref={titleRef}
            placeholder="새 챕터"
            maxLength="200"
            value={ChapterStore.chapterNewTitle}
            onChange={handleTitleInput}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
        </ChapterTitle>
      </LNBNewChapter>
    </>
  );
});

export default LNBNewChapterForm;