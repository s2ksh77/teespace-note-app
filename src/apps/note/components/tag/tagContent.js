import React, { useMemo, useEffect } from 'react';
import { useObserver } from 'mobx-react';
import {StyledCollapse} from '../../styles/tagStyle';
import TagStore from '../../store/tagStore';
import LoadingImg from '../../assets/Tee_loading.gif';
import {Panel, TagKeyRow} from '../../styles/tagStyle';
import TagKeyContainer from './tagKeyContainer';

const TagContentContainer = () => {
    const imgcontainer = useMemo(() => ({width:"5rem", margin:"auto"}),[]);
    let categoryInfo = {"KOR":"ㄱ ~ ㅎ", "ENG":"A ~ Z","NUM":"0 ~ 9", "ETC":"기타"};
    
    let resultTag = (tagKey) => {
        if (TagStore.isSearching === false) {
            return Object.keys(TagStore.filteredTagObj[tagKey])
        } else {
            return Object.keys(TagStore.filteredTagObj[tagKey]).filter((tagName) => {
                return tagName.includes(TagStore.searchString);
            })
        }        
    }

    return useObserver(()=> (
        <>
            { TagStore.tagPanelLoading === false ?
            (<StyledCollapse defaultActiveKey={['1', '2','3','4']}>
                {["KOR","ENG","NUM","ETC"].map((type,idx) => {   
                    return (
                        // "ㄱ~ㅎ"
                        <Panel header={categoryInfo[type]} key={String(idx+1)} >
                            {TagStore.sortedTagList[type].length > 0 && 				
                                TagStore.sortedTagList[type].map((tagKey) => {
                                    // "ㄱ", "ㄴ" ...
                                    let result = resultTag(tagKey);
                                    if (!result.length) return null;   
                                    return (
                                        <TagKeyRow key={tagKey}>
                                            <div>{tagKey}</div>
                                            <TagKeyContainer target={tagKey} targetList={result}/>
                                        </TagKeyRow>
                                    )
                                })
                            }
			            </Panel> 
                    )
                })}
            </StyledCollapse>)
            : <img style={imgcontainer} src={LoadingImg}/> }

        </>
    ))
}

export default TagContentContainer;