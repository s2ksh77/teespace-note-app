import React, {useMemo} from 'react';
import useStore from '../../store/useStore';
import maximize from '../../assets/ts_maximize@3x.png';
import minimize from '../../assets/ts_minimize@3x.png';
import cancel from '../../assets/ts_cancel@3x.png'
import '../../styles/note.css';
import styled from 'styled-components';

const HeaderButtonContainer = styled.div`
    display: flex;
    align-items:center;
    margin-left:0.75rem; 
`;

const Button = styled.img`
    width: 1rem;
    height: 1rem;
    filter: invert(52%) sepia(1%) saturate(2165%) hue-rotate(202deg) brightness(90%) contrast(109%);
`;

// 확대,축소 & 닫기 버튼
const HeaderButtons = () => {
    const {NoteStore} = useStore();
    const style = useMemo(() =>({marginLeft:"0.69rem"}), []);

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