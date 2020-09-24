import React, {useMemo} from 'react';
import useStore from '../../store/useStore';
import maximize from '../../assets/ts_maximize@3x.png';
import minimize from '../../assets/ts_minimize@3x.png';
import cancel from '../../assets/ts_cancel@3x.png';
import '../../styles/note.css';
import {HeaderButtonContainer, Button} from '../../styles/commonStyle';

// 확대,축소 & 닫기 버튼
const HeaderButtons = () => {
    const {NoteStore} = useStore();
    const style = useMemo(() =>({marginLeft:"0.69rem"}), []);
    /** 
     * EventBus.dispatch('onLayoutExpand')
     * EventBus.dispatch('onLayoutCollapse')
     * EventBus.dispatch('onLayoutClose')
     * **/

    const ChangeSizeButton = () => {
        if (NoteStore.getIsMaximumSize()) return (<Button src={minimize} />);
        else return (<Button src={maximize} />);
    }
    return (
        <>
            <HeaderButtonContainer>
                <ChangeSizeButton/>
                <Button style={style} src={cancel} />
            </HeaderButtonContainer>
        </>
    )
}

export default HeaderButtons;