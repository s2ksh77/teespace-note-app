import React, { useState } from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'antd';
import { logEvent } from 'teespace-core';
import useNoteStore from '../../stores/useNoteStore';
import {
  TagCollapse,
  PanelArrow,
  TagCategory,
  TagKeyContainer,
  TagKey,
  TagKeyList,
  TagItem,
  TagText,
  TagItemNum,
} from '../../styles/TagStyle';
import arrowUp from '../../assets/ts_arrow_up_line@3x.png';
import arrowDown from '../../assets/ts_arrow_down_line@3x.png';

const customExpandIcon = props => {
  if (props.isActive) return <PanelArrow src={arrowUp} alt="arrow-up" />;
  return <PanelArrow src={arrowDown} alt="arrow-down" />;
};

const TagBody = () => {
  const { NoteStore, TagStore } = useNoteStore();
  const { t } = useTranslation();
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);

  const categoryInfo = {
    KOR: t('NOTE_TAG_TAG_MENU_01'),
    ENG: t('NOTE_TAG_TAG_MENU_02'),
    NUM: t('NOTE_TAG_TAG_MENU_03'),
    ETC: t('NOTE_TAG_TAG_MENU_04'),
  };

  const handleClick = (tagId, tagName) => async () => {
    // ChapterStore.setIsTagSearching(true);
    // ChapterStore.setIsSearching(true);
    // lnb search창에 검색 시도(클릭)한 태그이름 나오고 검색 실행중 화면 보이기
    // ChapterStore.setSearchingTagName(tagName);
    // isTagSearching이고 isLoadingSearchResult일 때 검색 실행중 화면이 보인다
    // ChapterStore.setIsLoadingSearchResult(true);
    // await TagStore.setTagNoteSearchResult(tagId);
    // ChapterStore.setIsLoadingSearchResult(false);
    if (NoteStore.layoutState === 'collapse') {
      NoteStore.setTargetLayout('lnb');
    }

    logEvent('note', 'clickTagBtn');
  };

  const handleTooltip = e => {
    setIsEllipsisActive(
      e.currentTarget.offsetWidth < e.currentTarget.scrollWidth,
    );
  };

  return useObserver(() => (
    <>
      <TagCollapse
        defaultActiveKey={Object.keys(TagStore.tagListObj)}
        expandIcon={panelProps => customExpandIcon(panelProps)}
        expandIconPosition="right"
      >
        {Object.keys(TagStore.tagListObj).map(category => {
          // category : KOR, ENG,NUM,ETC
          return (
            // categoryInfo[category] : "ㄱ~ㅎ"
            <TagCategory header={categoryInfo[category]} key={category}>
              {TagStore.tagListObj[category]?.map(({ key, tagList }) => (
                // key : "ㄱ", "ㄴ" ..
                <TagKeyContainer key={key}>
                  <TagKey>{key}</TagKey>
                  <TagKeyList>
                    {tagList.map(({ id, text, noteList }) => (
                      <Tooltip key={id} title={isEllipsisActive ? text : null}>
                        <TagItem onClick={handleClick(id, text)} key={id}>
                          <TagText onMouseOver={handleTooltip}>{text}</TagText>
                          <TagItemNum>{noteList.length}</TagItemNum>
                        </TagItem>
                      </Tooltip>
                    ))}
                  </TagKeyList>
                </TagKeyContainer>
              ))}
            </TagCategory>
          );
        })}
      </TagCollapse>
    </>
  ));
};

export default TagBody;
