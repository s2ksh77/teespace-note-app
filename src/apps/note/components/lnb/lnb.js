import React from 'react';
import { useObserver } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useStore from '../../store/useStore';
import {
  LnbMenuCover,
  LnbMenuChapterCover,
  LnbMenuChapterTempUl,
  LnbMenuChapterTempDiv,
} from '../../styles/lnbStyle';
import {
  ChapterColorSpan,
  ChapterColorDiv,
  ChapterInput,
  ChapterTextContainer,
} from '../../styles/chpaterStyle';
import LnbMenuTitle from './lnbTitle';
import LnbMenuTagCover from './lnbTag';
import ChapterList from './chapterList';
import LnbSearchResult from './lnbSearchResult';

const LNBMenuContainer = () => {
  const { t } = useTranslation();
  const { ChapterStore } = useStore();

  const handleTitleInput = e => {
    const {
      target: { value },
    } = e;
    ChapterStore.setChapterTitle(value);
  };
  const createNewChapter = () => {
    // 분기는 더 여러개 있어야하지만 우선 만드는걸로
    if (ChapterStore.chapterNewTitle) {
      ChapterStore.createChapter(
        ChapterStore.chapterNewTitle,
        ChapterStore.isNewChapterColor,
      );
    }
  };

  return useObserver(() => (
    <>
      <LnbMenuCover>
        <LnbMenuTitle />
        <LnbMenuTagCover />
        {ChapterStore.isSearching ? (
          <LnbSearchResult />
        ) : (
          <LnbMenuChapterCover>
            {ChapterStore.isNewChapter ? (
              <LnbMenuChapterTempUl>
                <LnbMenuChapterTempDiv>
                  <ChapterColorDiv>
                    <ChapterColorSpan
                      color={ChapterStore.isNewChapterColor}
                      background={ChapterStore.isNewChapterColor}
                    />
                  </ChapterColorDiv>
                  <ChapterTextContainer>
                    <ChapterInput
                      placeholder={t('NewChapter')}
                      onChange={handleTitleInput}
                      onKeyPress={event => {
                        if (event.key === 'Enter') {
                          createNewChapter();
                        }
                      }}
                    />
                  </ChapterTextContainer>
                </LnbMenuChapterTempDiv>
              </LnbMenuChapterTempUl>
            ) : null}
            <ChapterList type={'chapter'} />
            {/* <LnbMenuTagCover /> */}
            {/* <ChapterList type={"shared"}/> */}
          </LnbMenuChapterCover>
        )}
      </LnbMenuCover>
    </>
  ));
};

export default LNBMenuContainer;
