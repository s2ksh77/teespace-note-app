import React, { useMemo } from 'react';
import LoadingImg from '../../assets/Tee_loading.gif';
import {CenterContentsContainer} from '../../GlobalStyles';

const LoadingImgContainer = () => {    
  const imgcontainer = useMemo(() => ({width:"5rem", margin:"auto"}),[]);

  return (
    <>
      <CenterContentsContainer>
        <img style={imgcontainer} src={LoadingImg}/>
      </CenterContentsContainer>
    </>
  )
}

export default LoadingImgContainer;