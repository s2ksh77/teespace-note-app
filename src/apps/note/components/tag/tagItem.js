import React from 'react';
import { useObserver } from 'mobx-react';
import TagStore from '../../store/tagStore';
import NoteStore from '../../store/noteStore';
import { TagChip, TagChipText, TagChipNum } from '../../styles/tagStyle';
import { Tag } from 'antd';

// key는 prop 아니어서 tagName porp 하나 더 만듦
const TagItem = ({tagName,tagInfo}) => {
    /*
        tagInfo : {tagId:'', note_id:[]}
    */
    const onClickTagBtn = () => {
        console.log(tagInfo.note_id)
    }

    return useObserver(() => (
        <>
            <TagChip onClick={onClickTagBtn}>
                <TagChipText>{tagName}</TagChipText>
                <TagChipNum>{tagInfo.note_id.length}</TagChipNum>
            </TagChip>
        </>
    ));
}

export default TagItem;