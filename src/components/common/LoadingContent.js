import React from 'react';

import {
  CenterContainer as LoadingImageWrapper,
  LoadingImage,
} from '../../styles/commonStyle';
import loadingImage from '../../assets/wapl_loading.gif';

const LoadingContent = () => {
  return (
    <LoadingImageWrapper>
      <LoadingImage src={loadingImage} />
    </LoadingImageWrapper>
  );
};

export default LoadingContent;
