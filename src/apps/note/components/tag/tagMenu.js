import React, {useEffect} from 'react';
import { useObserver } from 'mobx-react';
import TagStore from '../../store/tagStore';
import TagContentContainer from './tagContent';
import {TagListContainer} from '../../styles/tagStyle'
import TagMenuTitle from './tagMenuTitle';
import NoTagPage from './noTagPage'

const TagPanelContainer = () => {

  useEffect(() => {
    TagStore.getAllSortedTagList();        
  },[])

  return useObserver(()=> (
    <>
      <TagMenuTitle />  
      <TagListContainer>
      {(TagStore.hasTag) ? <TagContentContainer/> : <NoTagPage/>}
      </TagListContainer>
    </>
  ));
};

export default TagPanelContainer;
