import React, { memo } from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../store/useStore';
import { useDrop } from 'react-dnd';
import trashImg from '../../assets/trash.svg';
import { DRAG_TYPE } from '../../GlobalVariable';
import { useTranslation } from 'react-i18next';
import {
  RecycleBinImg,
  RecycleBinTxt,
  LnbRecycleContainer,
} from '../../styles/lnbStyle';

const LNBRecycleBin = memo(({ flexOrder }) => {
  const { NoteStore, ChapterStore, PageStore } = useNoteStore();
  const { t } = useTranslation();
  const [, drop] = useDrop({
    accept: DRAG_TYPE.CHAPTER,
    drop: () => {
      // 휴지통 drop 로직 넣어야 됨
    },
    hover() {
      // 휴지통 hover 로직 넣어야 됨
    },
  });

  const onClickRecycleBinMenuBtn = () => {
    // RecycleBin 띄우는 로직
  };

  return useObserver(() => (
    <>
      <LnbRecycleContainer ref={drop} order={flexOrder}>
        <RecycleBinImg
          showTag={!NoteStore.showPage}
          src={trashImg}
          alt="trashImg"
        />
        <RecycleBinTxt>{'휴지통'}</RecycleBinTxt>
      </LnbRecycleContainer>
    </>
  ));
});

export default LNBRecycleBin;
