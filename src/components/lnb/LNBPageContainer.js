import { Tooltip } from 'antd';
import { useObserver } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useCoreStores } from 'teespace-core';
import { useNoteStore } from '../../external';
import { PageCover, PageText, PageTextContainer } from '../../styles/pageStyle';
import NoteRepository from '../../store/noteRepository';
import ContextMenu from '../common/ContextMenu';
import PageItem from '../page/PageItem';
import { BookMarkIcon } from '../icons';

const LNBPageContainer = ({ selectedMenu }) => {
  const { PageStore, NoteStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  const [pageList, setPageList] = useState([]);

  const fetchPageData = async () => {
    let { noteList } = await fetchFunc();
    setPageList(noteList);
  };

  const fetchFunc = () => {
    if (selectedMenu === 'recent') return PageStore.getRecentList(10);
    else if (selectedMenu === 'bookmark')
      return PageStore.getbookmarkList(NoteRepository.chId);
  };

  const fetchFirstNote = () => {
    if (pageList) PageStore.fetchNoteInfoList(pageList[0].note_id);
  };

  const handleSelectPage = async id => {
    await PageStore.fetchCurrentPageData(id);
    PageStore.setIsRecycleBin(false);
  };

  const handleTooltip = e => {
    setIsEllipsisActive(e.currentTarget.offsetWidth < e.currentTarget.scrollWidth);
  };

  useEffect(() => {
    fetchPageData();
  }, [selectedMenu]);

  useEffect(() => {
    if (pageList.length > 0) fetchFirstNote();
  }, [pageList]);

  return useObserver(() => (
    <>
      <div style={{ flexDirection: 'column', width: '100%' }}>
        {pageList?.map((item, index) => (
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
              {/* {(authStore.hasPermission('notePage', 'U') ||
              item.type === CHAPTER_TYPE.SHARED) && (
              <ContextMenu
                noteType="page"
                note={page}
                chapterIdx={chapterIdx}
                pageIdx={index}
                parent={chapter}
              />
            )} */}
              {item.is_favorite === 'TRUE' ? (
                <div
                  onClick={async e => {
                    e.stopPropagation();
                    const data = await PageStore.unbookmarkPage(item.note_id);
                    if (data.resultMsg === 'Success') await fetchFunc();
                  }}
                >
                  <BookMarkIcon
                    width="1.25"
                    height="1.25"
                    color={item.is_favorite ? '#FECB38' : null}
                    isButton={true}
                  />
                </div>
              ) : null}
            </PageTextContainer>
          </PageCover>
        ))}
      </div>
    </>
  ));
};

export default React.memo(LNBPageContainer);
