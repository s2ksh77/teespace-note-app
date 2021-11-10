import React, { useRef, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../store/useStore';
import { LNBWrapper, LNBChapterCover, LNBEditModeCover } from '../../styles/lnbStyle';
import LNBHeader from './LNBHeader';
import LNBNewChapterForm from './LNBNewChapterForm';
import LNBTag from './LNBTag';
import LNBSearchResult from './LNBSearchResult';
import Searching from '../common/NoContent';
import ChapterItem from '../chapter/ChapterItem';
import RecycleBin from '../chapter/RecycleBin';
import NoteUtil from '../../NoteUtil';

const { getChapterNumType } = NoteUtil;

const LNBContainer = () => {
  const { NoteStore, ChapterStore, PageStore, EditorStore } = useNoteStore();
  const { t } = useTranslation();
  const LNBRef = useRef(null);

  const createNewChapter = async () => {
    // dialog 클릭시 blur이벤트 동작
    if (NoteStore.showModal) return;
    if (!ChapterStore.isNewChapter) return;
    const { chapterId, pageId } = await ChapterStore.createNoteChapter();
    NoteStore.modifyDragData(chapterId, pageId);
  };
  const handleEditMode = () => {
    if (EditorStore.isUploading) {
      NoteStore.setModalInfo('uploadingFiles');
      return;
    }

    if (!EditorStore.isEditCancelOpen()) {
      PageStore.handleNoneEdit();
      return;
    }
    PageStore.editCancel();
  };

  const handleClickOutside = e => {
    if (!e.target.closest('.chapter-div') && ChapterStore.dragData.size > 1) NoteStore.handleClickOutside('Chapter');
    if (!e.target.closest('.page-li') && PageStore.dragData.size > 1) NoteStore.handleClickOutside('Page');
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (LNBRef.current) NoteStore.setLNBChapterCoverRef(LNBRef.current);
    // ChapterStore.fetchChapterList();
  }, []);

  useEffect(() => {
    if (ChapterStore.isSearching || ChapterStore.isTagSearching) return;
    if (ChapterStore.scrollIntoViewId) {
      document?.getElementById(ChapterStore.scrollIntoViewId)?.scrollIntoView(true);
    }
  }, [ChapterStore.scrollIntoViewId]);

  return useObserver(() => (
    <>
      <LNBWrapper>
        <LNBEditModeCover
          mode={PageStore.isReadMode().toString()}
          onClick={!PageStore.isReadMode() ? handleEditMode : null}
        />
        {NoteStore.appType === 'wapl' ? (
          <LNBHeader createNewChapter={createNewChapter} />
        ) : null}
        <LNBChapterCover ref={LNBRef}>
          <LNBNewChapterForm
            show={ChapterStore.isNewChapter}
            createNewChapter={createNewChapter}
          />
          {(ChapterStore.isSearching || ChapterStore.isTagSearching) &&
          ChapterStore.isLoadingSearchResult ? (
            <Searching content="searching" />
          ) : (
            <LNBSearchResult />
          )}
          {!ChapterStore.isSearching && !ChapterStore.isTagSearching && (
            <DndProvider backend={HTML5Backend}>
              {ChapterStore.chapterList.map((item, index) => {
                switch (getChapterNumType(item.type)) {
                  case 0:
                  case 1: // default, NOTEBOOK
                    return (
                      <ChapterItem
                        key={item.id}
                        chapter={item}
                        index={index}
                        flexOrder={1}
                      />
                    );
                  case 2: // SHARED_PAGE
                    if (item.children.length > 0)
                      return (
                        <ChapterItem
                          key={item.id}
                          chapter={item}
                          index={index}
                          flexOrder={2}
                          isShared
                        />
                      );
                    break;
                  case 3:
                    return (
                      <ChapterItem
                        key={item.id}
                        chapter={item}
                        index={index}
                        flexOrder={2}
                        isShared
                      />
                    );
                  case 4:
                    return (
                      <RecycleBin
                        key={item.id}
                        chapter={item}
                        index={index}
                        flexOrder={3}
                      />
                    );
                  default:
                    break;
                }
              })}
              <LNBTag flexOrder={4} />
            </DndProvider>
          )}
        </LNBChapterCover>
      </LNBWrapper>
    </>
  ));
};

export default React.memo(LNBContainer);
