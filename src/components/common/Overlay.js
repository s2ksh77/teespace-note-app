import React, {useEffect, useRef} from 'react';
import { observer } from 'mobx-react';
import {OverlayCover, LoaderOverlay} from '../../styles/commonStyle';
import LoadingImg from '../../assets/wapl_loading.gif';

const Overlay = observer(() => {
  const overlayRef = useRef(null);

  useEffect(()=>{
    const parent = overlayRef.current.parentElement;
    const {top, left} = parent.getBoundingClientRect();
    overlayRef.current.style.top = top+'px';
    overlayRef.current.style.left = left+'px';
  },[]);
  
  return (
    <OverlayCover ref={overlayRef}>
      <LoaderOverlay src={LoadingImg} alt="loader" />
    </OverlayCover>
  )
})

export default Overlay;