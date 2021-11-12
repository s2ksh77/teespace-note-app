import React, { useEffect, useRef, useState } from 'react';
import { useObserver } from 'mobx-react';
import { logEvent } from 'teespace-core';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../store/useStore';
import { LNBNewChapter } from '../../styles/lnbStyle';
import { ChapterColor, ChapterInput, ChapterTitle } from '../../styles/chpaterStyle';

const LNBNewChapterForm = ({ isVisible }) => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const { t } = useTranslation();
  const titleRef = useRef(null);
  const [title, setTitle] = useState('');

  const createChapter = async () => {
    if (NoteStore.showModal || !ChapterStore.isNewChapter) return;
    const { chapterId, pageId } = await ChapterStore.createNoteChapter(title);
    NoteStore.updateDragData(chapterId, pageId);
  };

  const handleBlur = async e => {
    if (e.relatedTarget) {
      switch (e.relatedTarget.getAttribute('data-btn')) {
        case 'editorEditBtn':
          ChapterStore.setChapterTempUl(false);
          return;
        case 'noteNewChapterBtn':
          await createChapter();
          ChapterStore.getChapterRandomColor();
          ChapterStore.setChapterTempUl(true);
          return;
        default:
          break;
      }
    }
    await createChapter();
    logEvent('note', 'clickNewChapterBtn');
  };

  const handleTitleInput = e => setTitle(e.target.value);

  const handleKeyDown = e => {
    if (e.key !== 'Escape') return;
    ChapterStore.setChapterTempUl(false);
  };

  const handleKeyPress = e => {
    if (e.key !== 'Enter') return;
    createChapter();
    logEvent('note', 'clickNewChapterBtn');
  };

  useEffect(() => {
    const focusCondition = ChapterStore.isNewChapter || !NoteStore.showModal;
    if (titleRef.current && focusCondition) titleRef.current.focus();
  }, [ChapterStore.isNewChapter, NoteStore.showModal]);

  useEffect(() => {
    if (!ChapterStore.isNewChapter) setTitle('');
  }, [ChapterStore.isNewChapter]);

  return useObserver(() => (
    <>
      {isVisible && (
        <LNBNewChapter>
          <ChapterTitle>
            <ChapterColor background={ChapterStore.isNewChapterColor} />
            <ChapterInput
              ref={titleRef}
              placeholder={t('NOTE_PAGE_LIST_CMPNT_DEF_01')}
              maxLength="200"
              value={title}
              onChange={handleTitleInput}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onKeyPress={handleKeyPress}
            />
          </ChapterTitle>
        </LNBNewChapter>
      )}
    </>
  ));
};

export default React.memo(LNBNewChapterForm);
