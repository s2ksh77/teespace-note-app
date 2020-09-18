import React, { useMemo } from 'react';
import LoadingImg from '../../assets/Tee_loading.gif';
import { CenterContent } from '../../GlobalStyles';

const LoadingImgContainer = () => {
  const imgcontainer = useMemo(() => ({ width: "5rem", margin: "auto" }), []);

  return (
    <>
      <CenterContent>
        <img style={imgcontainer} src={LoadingImg} />
      </CenterContent>
    </>
  )
}

export default LoadingImgContainer;