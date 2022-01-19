import { Tooltip } from 'antd';
import { useObserver } from 'mobx-react';
import React, { useState, useLayoutEffect } from 'react';
import { useCoreStores } from 'teespace-core';
import { useNoteStore } from '../../external';
import { PageCover, PageText, PageTextContainer } from '../../styles/pageStyle';
import ContextMenu from '../common/ContextMenu';
import { BookMarkIcon } from '../icons';
import { BookMarkCover } from '../../styles/titleStyle';

const LNBPageContainer = ({ selectedMenu }) => {
  const { PageStore, NoteStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);

  const handleSelectPage = async id => {
    await PageStore.fetchCurrentPageData(id);
    PageStore.setIsRecycleBin(false);
  };

  const handleTooltip = e => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth);
  };

  useLayoutEffect(() => {
    PageStore.fetchLNBPageList(selectedMenu, true);
  }, [selectedMenu]);

  const toggleBookMark = async (id, isFavorite, e) => {
    e.stopPropagation();
    const result = await PageStore.toggleBookMark(id, isFavorite === 'TRUE');
    if (result === 'Success') {
      await PageStore.fetchLNBPageList(selectedMenu, PageStore.currentPageId === id);
    }
  };

  return useObserver(() => (
    <>
      <div style={{ flexDirection: 'column', width: '100%', position: 'relative' }}>
        {PageStore.lnbPageList?.map((item, index) => (
          <PageCover
            key={item.note_id}
            id={item.note_id}
            className="page-li"
            onClick={handleSelectPage.bind(null, item.note_id)}
          >
            <PageTextContainer
              style={{ justifyContent: 'space-between' }}
              className={
                PageStore.isCtrlKeyDown
                  ? PageStore.dragData.get(item.note_id)
                    ? 'selected'
                    : ''
                  : NoteStore.showPage &&
                    (NoteStore.isDragging && PageStore.dragData.size > 0
                      ? item.note_id === [...PageStore.dragData][0][0]
                      : item.note_id === PageStore.currentPageId)
                  ? 'selected'
                  : ''
              }
            >
              <Tooltip
                placement="bottomLeft"
                title={isEllipsisActive ? item.note_title : null}
              >
                <PageText
                  style={{ fontSize: '15px', marginLeft: '2.421rem' }}
                  onMouseOver={handleTooltip}
                >
                  {item.note_title}
                </PageText>
              </Tooltip>
              {(authStore.hasPermission('notePage', 'U') ||
                item.type === CHAPTER_TYPE.SHARED) && (
                <ContextMenu
                  noteType="page"
                  note={item}
                  // chapterIdx={chapterIdx}
                  pageIdx={index}
                  // parent={chapter}
                />
              )}
              <BookMarkCover
                className="ellipsisBtn"
                isItem
                visible={item.is_favorite === 'TRUE'}
                onClick={toggleBookMark.bind(this, item.note_id, item.is_favorite)}
              >
                <BookMarkIcon
                  width="1.25"
                  height="1.25"
                  color={item.is_favorite === 'TRUE' ? '#FECB38' : '#CCCCCC'}
                  isButton
                />
              </BookMarkCover>
            </PageTextContainer>
          </PageCover>
        ))}
      </div>
    </>
  ));
};

export default React.memo(LNBPageContainer);
