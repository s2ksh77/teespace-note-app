import React, { useEffect, useRef, useState } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';
import { LNBNewChapter } from '../../styles/LNBStyle';
import {
  ChapterColor,
  ChapterInput,
  ChapterTitle,
} from '../../styles/ChapterStyle';
import { useTranslation } from 'react-i18next';
import NoteUtil from '../../utils/NoteUtil';

const LNBNewChapterForm = () => {
  const { NoteStore, ChapterStore } = useNoteStore();
  const { t } = useTranslation();
  const inputRef = useRef('');
  const [inputValue, setInputValue] = useState('');
  const [newChapterColor, setNewChapterColor] = useState('');

  const handleChange = e => {
    const {
      target: { value },
    } = e;
    if (
      inputRef.current.getAttribute('maxlength') &&
      value.length > inputRef.current.getAttribute('maxlength')
    ) {
      value = value.slice(0, inputRef.current.getAttribute('maxlength'));
    }
    setInputValue(value);
  };

  const handleKeyDown = async e => {
    if (e.keyCode === 13) {
      try {
        const result = await ChapterStore.createChapter(
          inputValue,
          newChapterColor,
        );
        if (result) {
          ChapterStore.setNewChapterVisible(false);
          setInputValue('');
          setNewChapterColor('');
        }
      } catch (error) {
        console.error(`ChapterCreate :: Error is ${error}`);
      }
    } else if (e.keyCode === 27) {
      ChapterStore.setNewChapterVisible(false);
      setInputValue('');
      setNewChapterColor('');
    }
  };

  const handleBlur = async e => {
    try {
      const result = await ChapterStore.createChapter(
        inputValue,
        newChapterColor,
      );
      ChapterStore.setNewChapterVisible(false);
      setInputValue('');
      setNewChapterColor('');
    } catch (error) {
      console.error(`Chapter Blur Create :: Error is ${error}`);
    }
  };

  useEffect(() => {
    if (ChapterStore.newChapterVisible)
      setNewChapterColor(NoteUtil.getChapterRandomColor());
    inputRef.current.focus();
  }, [ChapterStore.newChapterVisible]);

  return useObserver(() => (
    <LNBNewChapter visible={ChapterStore.newChapterVisible}>
      <ChapterColor background={newChapterColor} />
      <ChapterTitle>
        <ChapterInput
          ref={inputRef}
          placeholder={t('NOTE_PAGE_LIST_CMPNT_DEF_01')}
          maxLength="200"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
      </ChapterTitle>
    </LNBNewChapter>
  ));
};

export default LNBNewChapterForm;
