import React from 'react';
import '../../styles/note.css';
import noPageImage from '../../assets/no_file.png';

// 페이지가 존재하지 않습니다
const PageNotFound = () => {
  return (
    <>
      <div className="note-editor_page-none">
        <div className="note-no_page_title">페이지가 없습니다.</div>
        <span className="note-no_page_text">
          시작하려면 "새 페이지 추가" 버튼을 클릭하세요.
        </span>
        <img className="note-no_page_image" src={noPageImage} />
      </div>
    </>
  );
};

export default PageNotFound;
