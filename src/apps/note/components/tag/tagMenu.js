import React, {useMemo} from 'react';
import { useObserver } from 'mobx-react';
import TagStore from '../../store/tagStore';
import TagContentContainer from './tagContent';
import HeaderButtons from '../buttons';
import styled from 'styled-components';
import noPageImage from '../../assets/no_file.png';
import {TagMenuHeader, TagListContainer} from '../../styles/tagStyle'

const TagPanelContainer = () => {
  // const tagList = TagStore.allTagList;
  const allTagList = useMemo(()=> TagStore.getAllTagList(), []);
  return useObserver(()=> (
    <>
      <TagMenuTitle />  
      <TagListContainer>
      {(TagStore.allTagList.length > 0) ? <TagContentContainer/> : <NoTagContainer/>}
      </TagListContainer>
    </>
  ));
};

const TagMenuTitle = () => {
  return (
    <>
      <TagMenuHeader>
        <HeaderButtons />
      </TagMenuHeader>
    </>
  );
};

// 페이지가 존재하지 않습니다
const NoTagContainer = () => {
  return (
    <>
      <div className="note-editor_page-none">
        <div className="note-no_page_title">태그가 없습니다.</div>
        <span className="note-no_page_text">
          페이지 하단에 태그를 입력하여 추가하거나
        </span>
        <span className="note-no_page_text">태그 목록을 검색하세요.</span>
        <img className="note-no_page_image" src={noPageImage} />
      </div>
    </>
  );
};

export default TagPanelContainer;
