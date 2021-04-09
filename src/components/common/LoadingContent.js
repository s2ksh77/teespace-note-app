import React from 'react';
import LoadingImg from '../../assets/wapl_loading.gif';
import { CenterContent } from '../../GlobalStyles';
import { WaplLoadingImg } from '../../styles/CommonStyle';

const LoadingContent = () => {
  return (
    <>
      <CenterContent>
        <WaplLoadingImg src={LoadingImg} alt="LoadingImg" />
      </CenterContent>
    </>
  );
};

export default LoadingContent;
