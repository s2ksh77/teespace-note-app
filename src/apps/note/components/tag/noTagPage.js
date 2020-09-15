import React from 'react';
import noPageImage from '../../assets/no_file.png';
import '../../styles/note.css'

// 페이지가 존재하지 않습니다
const NoTagPage = () => {
    return (
      <>
        <div className="note-editor_page-none">
          <div className="note-no_page_title">태그가 없습니다.</div>
          <span className="note-no_page_text">
            페이지 하단에 태그를 입력하여 추가하거나
          </span>
          <span className="note-no_page_text">태그 목록을 검색하세요.</span>
          <img className="note-no_page_image" src={noPageImage} />
        </div>
      </>
    );
  };

export default NoTagPage;