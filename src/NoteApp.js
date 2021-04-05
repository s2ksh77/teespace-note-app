import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';

// layoutState는 collapse, expand, close가 있다
const NoteApp = ({ layoutState, roomId, channelId, language }) => {

  return useObserver(() => (
    <>
      <div> Hello ~</div>
    </>
  ));
};

export { NoteApp };
