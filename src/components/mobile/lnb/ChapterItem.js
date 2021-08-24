import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../../store/useStore';
import {
  ChapterColor,
  ChapterContainer,
  ChapterCover,
  ChapterTextSpan,
  ChapterTitle,
} from '../../../styles/chpaterStyle';
import { Tooltip } from 'antd';
import { SharedPageIcon, ShareIcon, TrashIcon, NormalIcon } from '../../icons';
import { CHAPTER_TYPE } from '../../../GlobalVariable';

const ChapterItem = ({ chapter, index, flexOrder, isShared }) => {
  const { ChapterStore, NoteStore, PageStore } = useNoteStore();
  const { id, color, children, type, text: title } = chapter;

  const ChapterIcon = React.memo(() => {
    switch (type) {
      case CHAPTER_TYPE.SHARED_PAGE:
        return <SharedPageIcon />;
      case CHAPTER_TYPE.SHARED:
        return <ShareIcon />;
      case CHAPTER_TYPE.RECYCLE_BIN:
        return <TrashIcon />;
      default:
        return <NormalIcon />;
    }
  });

  const handleChapterClick = async () => {
    try {
      // 이미 그릴 때 받아온 pageList 보다 최신으로
      const res = await ChapterStore.getChapterInfoList(id);
      if (res && res.children) {
        PageStore.setPageList(res.children, color);
        ChapterStore.setChapterName(title);
      }
      NoteStore.setTargetLayout('LIST');
    } catch (e) {
      console.warn('Fetch PageList error', e);
    }
  };

  return useObserver(() => (
    <>
      <ChapterContainer
        style={{
          display: 'flex',
          height: '3.75rem',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        order={flexOrder}
        onClick={handleChapterClick}
      >
        <ChapterColor background={color} />
        <ChapterIcon />
        <ChapterCover
          appType={NoteStore.appType}
          style={{ width: '100%', height: 'inherit' }}
        >
          <ChapterTitle>
            <Tooltip>
              <ChapterTextSpan
                marginLeft={
                  type === CHAPTER_TYPE.NOTEBOOK || type === CHAPTER_TYPE.DEFAULT
                    ? '2.63rem'
                    : '2.63rem'
                }
              >
                {title}
              </ChapterTextSpan>
            </Tooltip>
          </ChapterTitle>
        </ChapterCover>
      </ChapterContainer>
    </>
  ));
};

export default ChapterItem;
