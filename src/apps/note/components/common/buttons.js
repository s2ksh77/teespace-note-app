import React, { useMemo } from 'react';
import { EventBus } from 'teespace-core';
import { useObserver } from 'mobx-react'
import useStore from '../../store/useStore';
import ExpandImg from '../../assets/ts_maximize@3x.png';
import CollapseImg from '../../assets/ts_minimize@3x.png';
import cancel from '../../assets/ts_cancel@3x.png';
import '../../styles/note.css';
import { HeaderButtonContainer, Button } from '../../styles/commonStyle';

// 확대,축소 & 닫기 버튼
const HeaderButtons = () => {
    const { NoteStore } = useStore();
    const style = useMemo(() => ({ marginLeft: "0.69rem" }), []);
    /** 
     * EventBus.dispatch('onLayoutExpand')
     * EventBus.dispatch('onLayoutCollapse')
     * EventBus.dispatch('onLayoutClose')
     * **/
    const onChangeImg = () => {
        switch (NoteStore.layoutState) {
            case 'expand':
                return CollapseImg
            default:
                return ExpandImg;
        }
    }
    const handleLayoutState = () => {
        switch (NoteStore.layoutState) {
            case 'expand':
                EventBus.dispatch('onLayoutCollapse');
                break;
            default:
                EventBus.dispatch('onLayoutExpand');
                break;
        }
    }
    return useObserver(() => (
        <>
            <HeaderButtonContainer>
                <Button src={onChangeImg()} onClick={handleLayoutState} />
                <Button style={style} src={cancel} />
            </HeaderButtonContainer>
        </>
    )
    )
}

export default HeaderButtons;