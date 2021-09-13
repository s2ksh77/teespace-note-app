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
import NoteUtil from '../../../NoteUtil';

const TagItem = ({ tag, listIdx }) => {
  return useObserver(() => (
    <TagItemContainer>
      <Color />
      <PageContentContainer>
        <ChapterTitle>
          {tag.TYPE === 'shared_page'
            ? t('NOTE_PAGE_LIST_CMPNT_DEF_07')
            : tag.TYPE === 'recycle_bin'
            ? t('NOTE_BIN_01')
            : tag.text}
        </ChapterTitle>
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
