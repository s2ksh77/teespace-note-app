import React, {useMemo} from 'react';
import { useObserver } from 'mobx-react';
import {Panel, TagKeyRow} from '../../styles/tagStyle';
import {StyledCollapse} from '../../styles/tagStyle';
import TagStore from '../../store/tagStore';
import TagKeyContainer from './tagKeyContainer'

const TagContentContainer = () => {
    const callback = () => {
        console.log('callback')
    }
    const text = 'text'
    // 일단 KEY 별로 준다( ㄱ,ㄴ,ㄷ ... )
    const getSortedTagList = useMemo(()=> TagStore.getAllSortedTagList(), []);
    return useObserver(()=> (
        <>
            <StyledCollapse defaultActiveKey={['1', '2','3','4']} onChange={callback}>
                <Panel header="ㄱ ~ ㅎ" key="1">
                {TagStore.sortedTagList.KOR.map((tagKey) => {
                    console.log('tagKey', tagKey)
                    return (
                        <TagKeyRow key={tagKey}>
                            <div>{tagKey}</div>
                            <TagKeyContainer target={tagKey} />
                        </TagKeyRow>
                    )
                })}
                </Panel>
                <Panel header="A ~ Z" key="2">
                {TagStore.sortedTagList.ENG.map((tagKey) => {
                    return (
                        <TagKeyRow key={tagKey}>
                            <div>{tagKey}</div>
                            <TagKeyContainer target={tagKey}/>
                        </TagKeyRow>
                    )
                })}
                </Panel>
                <Panel header="0 ~ 9" key="3">
                {TagStore.sortedTagList.NUM.map((tagKey) => {
                    return (
                        <TagKeyRow key={tagKey}>
                            <div>{tagKey}</div>
                            <TagKeyContainer target={tagKey}/>
                        </TagKeyRow>
                    )
                })}
                </Panel>
                <Panel header="기타" key="4">
                {TagStore.sortedTagList.ETC.map((tagKey) => {
                    return (
                        <TagKeyRow key={tagKey}>
                            <div>{tagKey}</div>
                            <TagKeyContainer target={tagKey}/>
                        </TagKeyRow>
                    )
                })}
                </Panel>
            </StyledCollapse>,
        </>
    ))
}

export default TagContentContainer;