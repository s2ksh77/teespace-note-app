import React from 'react';
import { observer } from 'mobx-react';
import useNoteStore from '../../store/useStore';

import { PageContainerCover } from '../../styles/pageStyle';
import EditorContainer from '../editor/EditorContainer';
import LoadingContent from '../common/LoadingContent';
import NoContent from '../common/NoContent';

// 페이지 보여줄 때
const PageContainer = observer(({ selectedMenu }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();

  const renderContent = (() => {
    if (ChapterStore.loadingPageInfo) return <LoadingContent />;
    if (ChapterStore.currentChapterId) {
      if (PageStore.currentPageId) return <EditorContainer selectedMenu={selectedMenu} />;
      if (!PageStore.isRecycleBin) return <NoContent header content="page" />;
    }
    return <NoContent header content="chapter" />;
  })();

  return (
    <PageContainerCover
      style={NoteStore.showPage ? { display: 'flex' } : { display: 'none' }}
    >
      {renderContent}
    </PageContainerCover>
  );
});

export default React.memo(PageContainer);
