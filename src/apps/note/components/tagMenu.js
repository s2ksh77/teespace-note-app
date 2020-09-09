import React, {memo} from 'react';
import TagStore from '../store/tagStore';
import TagContentContainer from './tagContent';

const TagMenuContainer = () => {
	const tagList = TagStore.getChannelTagList();
	return (
		<>
		<div>태그메뉴</div>
			{/* <TagMenuTitle/>
			{(tagList.length > 0) ? <TagContentContainer tagList={tagList}/> : <NoTagContainer/>} */}
		</>
	)
}

const TagMenuTitle = () => {
	return (
		<>
			<div>
				<input />
			</div>
		</>
	)
}

const NoTagContainer = () => {
    return (
        <>
            <div>
                
            </div>
        </>
    )
}

export default TagMenuContainer;