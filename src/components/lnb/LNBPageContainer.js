import { useObserver } from 'mobx-react';
import React, { useLayoutEffect, useEffect } from 'react';
import { useNoteStore } from '../../external';

import LNBPageItem from './LNBPageItem';

const LNBPageContainer = ({ selectedMenu }) => {
  const { PageStore, NoteStore } = useNoteStore();

  useLayoutEffect(() => {
    PageStore.fetchLNBPageList(selectedMenu, true);
  }, [selectedMenu]);

  useEffect(() => {
    if (!NoteStore.showPage) NoteStore.setShowPage(true);
  }, []);

  return useObserver(() => (
    <>
      <div style={{ flexDirection: 'column', width: '100%', position: 'relative' }}>
        {PageStore.lnbPageList?.map((item, index) => (
          <LNBPageItem selectedMenu={selectedMenu} item={item} {...item} index={index} />
        ))}
      </div>
    </>
  ));
};

export default React.memo(LNBPageContainer);
