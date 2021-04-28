import React, { useState } from 'react';
import { useObserver } from 'mobx-react';
import { useCoreStores } from 'teespace-core';
import { Tooltip } from 'antd';
import useNoteStore from '../../stores/useNoteStore';
import { PageWrapper, PageTitle, PageTitleInput } from '../../styles/PageStyle';
import ContextMenu from './ContextMenu';

const PageItem = ({ page }) => {
  const { NoteStore, PageStore } = useNoteStore();
  const { authStore } = useCoreStores();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);

  const handlePageClick = async () => {
    await PageStore.fetchNoteInfoList(page.id);
    PageStore.fetchNoteTagList(page.id);
    NoteStore.setIsPageContent(true);
    if (NoteStore.isCollapsed) NoteStore.setTargetLayout('content');
  };

  const handleTooltip = e => {
    setIsEllipsisActive(
      e.currentTarget.offsetWidth < e.currentTarget.scrollWidth,
    );
  };
  return useObserver(() => (
    <PageWrapper
      className={
        NoteStore.isPageContent && PageStore.pageModel.id === page.id
          ? 'selected'
          : ''
      }
      onClick={handlePageClick}
    >
      <Tooltip
        placement="bottomLeft"
        title={isEllipsisActive ? page.text : null}
      >
        <PageTitle onMouseOver={handleTooltip}>{page.text}</PageTitle>
      </Tooltip>
      {(authStore.hasPermission('notePage', 'U') || page.type === 'shared') && (
        <ContextMenu itemType="page" item={page} />
      )}
    </PageWrapper>
  ));
};

export default PageItem;
