import React, { useEffect, useState } from 'react';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';
import {
  PageList,
  PageliIcon,
  PageTextCover,
  PageText,
  PageEllipsis,
  NewPageSpan,
  NewPageBlock,
  NewPageBtn,
} from '../styles/pageStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import useStore from '../store/useStore';

const PageContainer = ({ children }) => {
  const childrenList = JSON.parse(children);
  const { PageStore } = useStore();
  const [curPageId, setPage] = useState(null);

  useEffect(() => {
    if (curPageId) selectPage(curPageId);
  });
  const selectPage = async targetId => {
    await PageStore.getNoteInfoList(targetId);
    // const editorTitle = document.querySelector("#editorTitle");
    // editorTitle.value = PageStore.noteInfoList.note_title;
  };
  return useObserver(() => (
    <>
      {childrenList.map(item => (
        <PageList
          key={item.id}
          id={item.id}
          onClick={({ currentTarget: { id } }) => setPage(id)}
        >
          <PageliIcon />
          <PageTextCover>
            <PageText>{item.text}</PageText>
            <PageEllipsis className="ellipsisBtn">
              <FontAwesomeIcon icon={faEllipsisV} size={'1x'} />
            </PageEllipsis>
          </PageTextCover>
        </PageList>
      ))}
      <NewPageSpan>
        <NewPageBlock>
          <NewPageBtn>+ 새 페이지 추가</NewPageBtn>
        </NewPageBlock>
      </NewPageSpan>
    </>
  ));
};

export default PageContainer;
