import React from 'react';
import useStore from '../store/useStore';
import { useObserver } from 'mobx-react';
import ChapterColor from './chapterColor';
import ChapterText from './chapterText';
import PageContainer from './page';
import { LnbMenuCover, LnbMenuChapterCover } from '../styles/lnbStyle';
import { ChapterContainerUl, ChapterUlDIV } from '../styles/chpaterStyle';
import LnbMenuTitle from './lnbTitle';

const LNBMenuContainer = () => {
  const { ChapterStore } = useStore();
  if (ChapterStore.chapterList.length === 0) ChapterStore.getChapterList();

  return useObserver(() => (
    <>
      <LnbMenuCover>
        <LnbMenuTitle />
        <LnbMenuChapterCover>
          {ChapterStore.chapterList.map(item => (
            <ChapterContainerUl key={item.id} itemType="chapter">
              <ChapterUlDIV>
                <ChapterColor color={item.color} />
                <ChapterText text={item.text} />
              </ChapterUlDIV>
              <PageContainer children={JSON.stringify(item.children)} />
            </ChapterContainerUl>
          ))}
        </LnbMenuChapterCover>
      </LnbMenuCover>
    </>
  ));
};

export default LNBMenuContainer;
