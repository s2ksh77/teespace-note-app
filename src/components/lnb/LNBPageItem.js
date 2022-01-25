import { useObserver } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import {
  PageCover,
  PageText,
  PageTextContainer,
  PageTextInput,
} from '../../styles/pageStyle';
import ContextMenu from '../common/ContextMenu';
import { BookMarkIcon } from '../icons';
import { BookMarkCover } from '../../styles/titleStyle';
import { Tooltip } from 'antd';
import { useCoreStores } from 'teespace-core';
import { checkMaxLength } from '../common/validators';
import { useNoteStore } from '../../external';

const LNBPageItem = ({
  selectedMenu,
  item,
  index,
  id,
  text,
  parent_notebook,
  is_favorite,
}) => {
  const { PageStore, NoteStore } = useNoteStore();

  const { authStore } = useCoreStores();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);

  const [renameTitle, setRenameTitle] = useState('');

  const handleSelectPage = async id => {
    await PageStore.fetchCurrentPageData(id);
    PageStore.setIsRecycleBin(false);
  };

  const handleTooltip = e => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth);
  };

  const toggleBookMark = async (id, isFavorite, e) => {
    e.stopPropagation();
    const result = await PageStore.toggleBookMark(id, isFavorite === 'TRUE');
    if (result === 'Success') {
      await PageStore.fetchLNBPageList(selectedMenu, PageStore.currentPageId === id);
    }
  };

  const handleTitleChange = e => {
    setRenameTitle(checkMaxLength(e));
  };

  const handleRename = async isEscape => {
    if (isEscape || !renameTitle) {
      setRenameTitle(text);
      PageStore.setRenameId('');
    } else if (renameTitle !== text) {
      await PageStore.renameNotePage({
        id,
        title: renameTitle,
        chapterId: parent_notebook,
        selectedMenu,
        pageOnly: true,
      });
      PageStore.setRenameId('');
    }

    NoteStore.LNBChapterCoverRef.removeEventListener('wheel', NoteStore.disableScroll);
  };

  const handleFocus = e => e.target.select();

  useEffect(() => {
    setRenameTitle(text);
  }, []);

  return useObserver(() => (
    <PageCover
      key={id}
      id={id}
      className="page-li"
      onClick={handleSelectPage.bind(null, id)}
    >
      <PageTextContainer
        style={{ justifyContent: 'space-between' }}
        className={
          PageStore.isCtrlKeyDown
            ? PageStore.dragData.get(id)
              ? 'selected'
              : ''
            : NoteStore.showPage &&
              (NoteStore.isDragging && PageStore.dragData.size > 0
                ? id === [...PageStore.dragData][0][0]
                : id === PageStore.currentPageId)
            ? 'selected'
            : ''
        }
      >
        {PageStore.getRenameId() === id ? (
          <PageTextInput
            maxLength="200"
            placeholder={text}
            value={renameTitle}
            onClick={e => e.stopPropagation()}
            onChange={handleTitleChange}
            onBlur={handleRename.bind(null, false)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleRename(false);
              else if (e.key === 'Escape') handleRename(true);
            }}
            onFocus={handleFocus}
            autoFocus
          />
        ) : (
          <>
            <Tooltip placement="bottomLeft" title={isEllipsisActive ? text : null}>
              <PageText
                style={{ fontSize: '15px', marginLeft: '2.421rem' }}
                onMouseOver={handleTooltip}
              >
                {text}
              </PageText>
            </Tooltip>
            {(authStore.hasPermission('notePage', 'U') ||
              type === CHAPTER_TYPE.SHARED) && (
              <ContextMenu
                noteType="page"
                note={item}
                // chapterIdx={chapterIdx}
                pageIdx={index}
                parent={{ id: parent_notebook }}
                pageOnly={true}
              />
            )}
            <BookMarkCover
              className="ellipsisBtn"
              isItem
              visible={is_favorite === 'TRUE'}
              onClick={toggleBookMark.bind(this, id, is_favorite)}
            >
              <BookMarkIcon
                width="1.25"
                height="1.25"
                color={is_favorite === 'TRUE' ? '#FECB38' : '#CCCCCC'}
                isButton
              />
            </BookMarkCover>
          </>
        )}
      </PageTextContainer>
    </PageCover>
  ));
};

export default React.memo(LNBPageItem);
