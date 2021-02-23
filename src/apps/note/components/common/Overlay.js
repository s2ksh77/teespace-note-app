import React from 'react';
import ReactDom from 'react-dom';
import { observer } from 'mobx-react';
import NoteStore from '../../store/noteStore';
import {OverlayCover, LoaderOverlay} from '../../styles/commonStyle';
import LoadingImg from '../../assets/wapl_loading.gif';

const Overlay = observer(() => {
  return ReactDom.createPortal(
    <>
      <OverlayCover />
      <LoaderOverlay src={LoadingImg} alt="loader" />
    </>
    , document.body
  )
})

export default Overlay;