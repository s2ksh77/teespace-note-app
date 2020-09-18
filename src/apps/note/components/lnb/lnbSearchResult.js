import React from 'react';
import useStore from "../../store/useStore";
import { useObserver } from "mobx-react";

const LNBSearchResult = () => {
	const { ChapterStore } = useStore();

	return (
		<>
			{ChapterStore.chapterList.map((item) => {
				console.log(item)
			})}
		</>
	)
}

export default LNBSearchResult;