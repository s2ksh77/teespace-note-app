/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useObserver } from 'mobx-react';

import {
  TagItemContainer,
  Color,
  PageContentContainer,
  ChapterTitle,
  PageTitle,
  TagChip,
} from '../styles/listviewStyles';
import { TagList } from '../../../styles/tagStyle';
import NoteUtil, { getI18nChapterTitle } from '../../../NoteUtil';

const TagItem = ({ tag, listIdx }) => {
  return useObserver(() => (
    <TagItemContainer>
      <Color />
      <PageContentContainer>
        <ChapterTitle>{getI18nChapterTitle(tag.TYPE, tag.text)}</ChapterTitle>
        <PageTitle>{tag.note_title}</PageTitle>
        <TagList>
          {tag.tagList.map((item, index) => {
            return (
              <TagChip id={item.tag_id} key={`${listIdx}_${index}`}>
                {NoteUtil.decodeStr(item.text)}
              </TagChip>
            );
          })}
        </TagList>
      </PageContentContainer>
    </TagItemContainer>
  ));
};

export default TagItem;
