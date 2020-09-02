import React from 'react';
import { useObserver } from 'mobx-react';
import {
  ChapterTextContainer,
  ChapterTextSpan,
  ChapterTextEllipsis,
  ChapterFolderBtn,
} from '../styles/chpaterStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons';

const ChapterText = ({ text }) => {
  return useObserver(() => (
    <>
      <ChapterTextContainer>
        <ChapterTextSpan>{text}</ChapterTextSpan>
        <ChapterTextEllipsis className="ellipsisBtn">
          <FontAwesomeIcon icon={faEllipsisV} size={'1x'} />
        </ChapterTextEllipsis>
      </ChapterTextContainer>
      <ChapterFolderBtn>
        <FontAwesomeIcon icon={faAngleDown} size={'2x'} />
      </ChapterFolderBtn>
    </>
  ));
};

export default ChapterText;
