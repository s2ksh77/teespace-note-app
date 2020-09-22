import React from 'react';
import styled from 'styled-components';
import defaultIcon from './../../assets/note_icon_default.svg';
import activeIcon from './../../assets/note_icon_active.svg';
import disabledIcon from './../../assets/note_icon_disabled.svg';

function NoteIcon({
  state = 'default',
  width = 50,
  height = 50,
  onClick = null,
}) {
  const handleClick = () => {
    if (state === 'default') {
      onClick?.();
    }
  };

  const renderIcon = () => {
    switch (state) {
      case 'default':
        return <img src={defaultIcon} />;
      case 'active':
        return <img src={activeIcon} />;
      case 'disable':
        return <img src={disabledIcon} />;
      default:
        return null;
    }
  };
  return (
    <IconWrapper
      className={`icon--${state}`}
      width={width}
      height={height}
      onClick={handleClick}
    >
      {renderIcon()}
    </IconWrapper>
  );
}

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  & > img {
    height: auto;
  }

  &.icon--active > img {
    width: ${props => props.width}px;
  }

  &:not(.icon--active) > img {
    width: ${props => props.width - 20}px;
  }

  &.icon--default:hover {
    border-radius: 50%;
    background: #dcddff;
    cursor: pointer;
  }
`;
export default NoteIcon;
