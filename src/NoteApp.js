import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import ChapterStore from './stores/store/ChapterStore';
// layoutState는 collapse, expand, close가 있다
const NoteApp = ({ layoutState, roomId, channelId, language }) => {
  console.log(channelId);

  useEffect(() => {
    ChapterStore.fetchChapterList(channelId);
  }, [roomId]);

  return useObserver(() => (
    <>
      <div> Hello ~</div>
    </>
  ));
};

export { NoteApp };
