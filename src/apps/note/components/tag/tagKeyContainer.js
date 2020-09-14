import React, {useMemo} from 'react';
import TagItem from './tagItem'
import { useObserver } from 'mobx-react';
import TagStore from '../../store/tagStore';
import {TagKeyBox} from '../../styles/tagStyle';

const TagKeyContainer = ({target}) => {
    const sortTagKeys = () => {        
        let tagKey = [];
        Object.keys(TagStore.filteredTagObj[target]).map((item) => {
            tagKey.push(item);
        })
        tagKey.sort(); 
        return tagKey;      
    }
    const tagKey = useMemo(() => sortTagKeys(),[]);

    return (
        <>
            <TagKeyBox>
                {tagKey.map((tagName)=>{
                    return (
                        <TagItem key={tagName} tagName={tagName} tagInfo={TagStore.filteredTagObj[target][tagName]} />
                    )
                })}
            </TagKeyBox>
        </>
    );
}

export default TagKeyContainer;