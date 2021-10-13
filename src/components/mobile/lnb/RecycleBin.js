import React, { useState, useContext } from 'react';
import { useObserver } from 'mobx-react';
import { useDrop } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import { Checkbox, useCoreStores } from 'teespace-core';
import { ThemeContext } from 'styled-components';
import useNoteStore from '../../../store/useStore';
import ChapterText from '../../chapter/ChapterText';
import PageList from '../../page/PageList';
import { ChapterContainer, ChapterCover } from '../../../styles/chpaterStyle';
import { TrashIcon } from '../../icons';
import { DRAG_TYPE } from '../../../GlobalVariable';
import { ChapterItemContainer } from '../styles/lnbStyles';
import { CheckBoxContainer } from '../styles/listviewStyles';

const RecycleBin = ({ chapter, index, flexOrder }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { userStore } = useCoreStores();
  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();
  // 주의: ChapterStore.chapterList의 isFolded는 getNoteChapterList때만 정확한 정보 담고 있음
  const [isFolded, setIsFolded] = useState(true);
  const { id, children, type } = chapter;

  const handleRecycleBinClick = async e => {
    try {
      const res = await ChapterStore.getChapterInfoList(id);
      if (res && res.children) {
        PageStore.setPageList(res.children);
        ChapterStore.setChapterName(t('NOTE_BIN_01'));
      }
      PageStore.setIsRecycleBin(true);
      NoteStore.setTargetLayout('List');
    } catch (e) {
      console.warn('Fetch PageList error', e);
    }
  };

  const handleFoldBtnClick = e => {};

  return useObserver(() => (
    <ChapterContainer
      className={isFolded ? 'folded ' : ''}
      key={id}
      order={flexOrder}
      style={{ width: '100%', marginLeft: NoteStore.isLongPress ? '2.81rem' : '0.81rem' }}
    >
      <ChapterCover
        className={`chapter-div${
          id === ChapterStore.currentChapterId ? ' selectedMenu' : ''
        }`}
        onClick={handleRecycleBinClick}
        style={ChapterStore.dragEnterChapterIdx === index ? { color: '#205855' } : null}
        isRecycleBin={true}
      >
        <TrashIcon color={themeContext.SubStateVivid} />
        <ChapterText
          chapter={chapter}
          index={index}
          handleFoldBtnClick={handleFoldBtnClick}
          isFolded={isFolded}
        />
      </ChapterCover>
    </ChapterContainer>
  ));
};

export default RecycleBin;
