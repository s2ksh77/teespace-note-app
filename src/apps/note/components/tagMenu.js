import React, {memo} from 'react';
import TagStore from '../store/tagStore';
import TagContentContainer from './tagContent';
import HeaderButtons from './buttons';
import styled from 'styled-components';
import noPageImage from '../assets/no_file.png';

const TagMenuHeader = styled.div`
	height:3rem;
	width:100%;
	display:flex;
	padding:0 0.75rem;
	box-sizing: border-box;
	border-bottom: 0.0625rem solid #dadada;	
`;

const TagContainer = styled.div`
	width: 100%;
	height: 100%;
	display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const TagMenuContainer = () => {
	const tagList = TagStore.getChannelTagList();
	return (
		<>
			<TagMenuTitle/>
			<TagContainer>
				<NoTagContainer/>
			</TagContainer>
			{/* <TagMenuTitle/>
			{(tagList.length > 0) ? <TagContentContainer tagList={tagList}/> : <NoTagContainer/>} */}
		</>
	)
}

const TagMenuTitle = () => {
	return (
		<>
			<TagMenuHeader>
				<HeaderButtons />
			</TagMenuHeader>
		</>
	)
}

// 페이지가 존재하지 않습니다
const NoTagContainer= () => {
    return (
        <>
            <div className="note-editor_page-none">
                <div className="note-no_page_title">태그가 없습니다.</div>
				<span class="note-no_page_text">페이지 하단에 태그를 입력하여 추가하거나</span>
				<span class="note-no_page_text">태그 목록을 검색하세요.</span>
                <img className="note-no_page_image" src={noPageImage} />
            </div>
        </>
    )
}

export default TagMenuContainer;