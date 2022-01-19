import React, { useEffect, useRef } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { OverlayCover, LoaderOverlay } from '../../styles/commonStyle';
import LoadingImg from '../../assets/wapl_loading.gif';

const Overlay = ({ backgroundColor }) => {
  const { NoteStore } = useNoteStore();
  const overlayRef = useRef(null);

  useEffect(() => {
    const parent = overlayRef.current.parentElement;
    const { top, left } = parent.getBoundingClientRect();
    overlayRef.current.style.top = `${top}px`;
    overlayRef.current.style.left = `${left}px`;
  }, []);

  return useObserver(() => (
    <OverlayCover
      style={
        backgroundColor && {
          backgroundColor,
          display: NoteStore.isFetchingGNBContent ? 'flex' : 'none',
        }
      }
      ref={overlayRef}
    >
      <LoaderOverlay src={LoadingImg} alt="loader" />
    </OverlayCover>
  ));
};

export default Overlay;
