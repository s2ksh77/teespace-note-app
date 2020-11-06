import React from 'react';
import LoadingImg from '../../assets/Tee_loading.gif';
import { CenterContent } from '../../GlobalStyles';

const imgcontainer = { width: '5rem', margin: 'auto' };
const LoadingImgContainer = () => {
  return (
    <>
      <CenterContent>
        <img style={imgcontainer} src={LoadingImg} alt="LoadingImg" />
      </CenterContent>
    </>
  );
};

export default LoadingImgContainer;
