import React from 'react';
import { useObserver } from 'mobx-react';
import useNoteStore from '../../stores/useNoteStore';

import { LNBTagWrapper, LNBTagIcon, LNBTagText } from '../../styles/LNBStyle';
import tagIcon from '../../assets/add_tag.svg';

const LNBTag = () => {
  const { NoteStore } = useNoteStore();

  return useObserver(() => (
    <LNBTagWrapper>
      <LNBTagIcon src={tagIcon} />
      <LNBTagText>태그</LNBTagText>
    </LNBTagWrapper>
  ));
};

export default LNBTag;
