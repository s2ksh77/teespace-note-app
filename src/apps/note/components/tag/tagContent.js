import React, {memo, useMemo} from 'react';
import { useObserver } from 'mobx-react';
import {Panel, TagKeyRow} from '../../styles/tagStyle';
import {StyledCollapse} from '../../styles/tagStyle';
import TagStore from '../../store/tagStore';
import TagKeyContainer from './tagKeyContainer'
import LoadingImg from '../../assets/Tee_loading.gif';

const TagContentContainer = memo(() => {
    // 일단 KEY 별로 준다( ㄱ,ㄴ,ㄷ ... )
    const imgcontainer = useMemo(() => ({width:"5rem", margin:"auto"}),[]);
    
    return useObserver(()=> (
        <>
            { TagStore.tagPanelLoading == false ?
            (<StyledCollapse defaultActiveKey={['1', '2','3','4']}>
                <Panel header="ㄱ ~ ㅎ" key="1">
                {TagStore.sortedTagList.KOR.map((tagKey) => {
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
            </StyledCollapse>)
            : <img style={imgcontainer} src={LoadingImg}/> }

        </>
    ))
})

export default TagContentContainer;