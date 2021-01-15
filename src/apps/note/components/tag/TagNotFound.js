import React from 'react';
import noPageImage from '../../assets/no_file.svg';
import {
  NoneContainer,
  NoneTitle,
  NoneText,
  NoneImg
} from '../../styles/commonStyle';

// 페이지가 존재하지 않습니다
const TagNotFound = () => {
  return (
    <>
      <NoneContainer>
        <NoneTitle>태그가 없습니다.</NoneTitle>
        <NoneText>
          페이지 하단에 태그를 입력하여 추가하세요.
        </NoneText>
        <NoneImg src={noPageImage} alt="tag_not_found" />
      </NoneContainer>
    </>
  );
};

export default TagNotFound;