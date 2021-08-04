import React, { useEffect, useRef } from 'react';
import useNoteStore from "../../store/useStore";
import { LNBNewChapter } from "../../styles/lnbStyle";
import { observer } from 'mobx-react';
import {
  ChapterColor,
  ChapterInput,
  ChapterTitle,
} from "../../styles/chpaterStyle";
import { logEvent } from 'teespace-core';
import { useTranslation } from 'react-i18next';
import { checkMaxLength } from '../common/validators';

const { NoteStore, ChapterStore } = useNoteStore();

const LNBNewChapterForm = observer(({ show, createNewChapter }) => {
  // return 전에 hook이 위치해야함
  const { t } = useTranslation();
  const titleRef = useRef(null);

  const handleBlur = async (e) => {
    if (e.relatedTarget) {
      switch (e.relatedTarget.getAttribute('data-btn')) {
        case "editorEditBtn": ChapterStore.setChapterTempUl(false); return;
        case "noteNewChapterBtn": return;
        default: break;
      }
    }
    await createNewChapter();
    logEvent('note', 'clickNewChapterBtn');
  }

  const handleTitleInput = (e) => ChapterStore.setChapterTitle(checkMaxLength(e));

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        createNewChapter();
        logEvent('note', 'clickNewChapterBtn');
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

  // observer가 NoteStore.showModal을 관찰하도록 두 번째 배열 인자에 넘어줌!
  useEffect(() => {
    const focusCondition = ChapterStore.isNewChapter || !NoteStore.showModal;
    if (titleRef.current && focusCondition) titleRef.current.focus();
  }, [ChapterStore.isNewChapter, NoteStore.showModal])

  if (!show) return null;
  return (
    <>
      <LNBNewChapter>
        <ChapterTitle>
          <ChapterColor background={ChapterStore.isNewChapterColor} />
          <ChapterInput
            ref={titleRef}
            placeholder={t('NOTE_PAGE_LIST_CMPNT_DEF_01')}
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