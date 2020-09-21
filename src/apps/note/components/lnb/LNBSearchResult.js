import React from 'react';
import useStore from "../../store/useStore";
import { useObserver } from "mobx-react";
import {ChapterSearchResult, ChapterSearchResultColor, ChapterSearchResultTitle,
	PageSearchResult, PageSearchResultPageTitle, PageSearchResultChapterTitle} from '../../styles/lnbStyle';
import NoteStore from '../../store/noteStore';

// chapter : id, title, color, firstPageId
// page : chapterId, chapterTitle, id, title
const LNBSearchResult = () => {
	const { ChapterStore, PageStore } = useStore();
	// 챕터 검색때만 초기화
	const onClickChapterBtn = (chapterId, pageId, e) => {
		ChapterStore.setCurrentChapterId(chapterId);
		PageStore.setCurrentPageId(pageId);
		ChapterStore.setIsTagSearching(false);
		ChapterStore.setIsSearching(false);
		ChapterStore.setInputValue("");
		NoteStore.setShowPage(true);
	}

	const onClickPageBtn = (chapterId, pageId, e) => {
		ChapterStore.setCurrentChapterId(chapterId);
		PageStore.setCurrentPageId(pageId);
		// ChapterStore.setIsTagSearching(false);
		// ChapterStore.setIsSearching(false);
		// ChapterStore.setInputValue("");
		NoteStore.setShowPage(true);
	}
	
	return useObserver(()=>(
		<>
			{ChapterStore.searchResult?.["chapter"]?.map((chapter) => {
				return (
					<ChapterSearchResult key={chapter.id} onClick={onClickChapterBtn.bind(null,chapter.id, chapter.firstPageId)}>
						<ChapterSearchResultColor backgroundColor={chapter.color} />
						<ChapterSearchResultTitle>{chapter.title}</ChapterSearchResultTitle>
					</ChapterSearchResult>
				)
			})}
			{ChapterStore.searchResult?.["page"]?.map((page) => {
				return (
					<PageSearchResult key={page.id}onClick={onClickPageBtn.bind(null,page,page.chapterId, page.id)}>
						<PageSearchResultPageTitle>{page.title}</PageSearchResultPageTitle>
						<PageSearchResultChapterTitle>{page.chapterTitle}</PageSearchResultChapterTitle>
					</PageSearchResult>
				)
			})}
		</>
	));
}

export default LNBSearchResult;