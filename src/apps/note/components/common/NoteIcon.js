import React from 'react';
import styled from 'styled-components';
import activeIcon from './../../assets/note_icon_active.svg';

const StyleNoteIcon = ({
  style = {},
  fill = "#000",
  width = "100",
  height = "100",
  viewBox = "0 0 24 24"
}) => (
  <svg 
    width={width}
    style={style}
    height={height}
    viewBox={viewBox} 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink">
      <g 
      id="Icon/appList/TeeNote" 
      stroke="none" 
      strokeWidth="1" 
      fill="none" 
      fillRule="evenodd">
        <path d="M21,2 C21.5522847,2 22,2.44771525 22,3 L22,21 C22,21.5522847 21.5522847,22 21,22 L4,22 C3.44771525,22 3,21.5522847 3,21 L3,17 L2,17 C1.44771525,17 1,16.5522847 1,16 C1,15.4477153 1.44771525,15 2,15 L3,15 L3,13 L2,13 C1.44771525,13 1,12.5522847 1,12 C1,11.4477153 1.44771525,11 2,11 L3,11 L3,9 L2,9 C1.44771525,9 1,8.55228475 1,8 C1,7.44771525 1.44771525,7 2,7 L3,7 L3,3 C3,2.44771525 3.44771525,2 4,2 L21,2 Z M20,4 L5,4 L5,7 L6,7 C6.55228475,7 7,7.44771525 7,8 C7,8.55228475 6.55228475,9 6,9 L5,9 L5,11 L6,11 C6.55228475,11 7,11.4477153 7,12 C7,12.5522847 6.55228475,13 6,13 L5,13 L5,15 L6,15 C6.55228475,15 7,15.4477153 7,16 C7,16.5522847 6.55228475,17 6,17 L5,17 L5,20 L20,20 L20,4 Z M17,15 C17.5522847,15 18,15.4477153 18,16 C18,16.5522847 17.5522847,17 17,17 L11,17 C10.4477153,17 10,16.5522847 10,16 C10,15.4477153 10.4477153,15 11,15 L17,15 Z M17,11 C17.5522847,11 18,11.4477153 18,12 C18,12.5522847 17.5522847,13 17,13 L11,13 C10.4477153,13 10,12.5522847 10,12 C10,11.4477153 10.4477153,11 11,11 L17,11 Z M17,7 C17.5522847,7 18,7.44771525 18,8 C18,8.55228475 17.5522847,9 17,9 L11,9 C10.4477153,9 10,8.55228475 10,8 C10,7.44771525 10.4477153,7 11,7 L17,7 Z" 
        id="Combined-Shape" 
        fill={fill}></path>
    </g>
  </svg>
);
function NoteIcon({
  state = 'default',
  width = 24,
  height = 24,
  onClick = null,
}) {
  const handleClick = () => {
    if (state === 'default' && onClick) {
      onClick();
    }
  };

  const renderIcon = () => {
    switch (state) {
      case 'default':
        return <StyleNoteIcon fill={"#75757F"} width={"24"} height={"24"}/>;
      case 'active':
        return <img src={activeIcon} width={"40"} height={"32"} alt=""/>;
      case 'disable':
        return <StyleNoteIcon fill={"#CCCCCC;"} width={"24"} height={"24"}/>;
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
  position: relative;
  align-items: center;
  justify-content: center;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  svg {
    z-index: 100;
  }
  &.icon--default:hover {
    &:after {
      position: absolute;
      top:50%;
      margin-top:-16px;
      left:50%;
      margin-left:-16px;
      display: inline-block;
      content: '';
      width: 32px;
      height: 32px;
      background-color: #dcddff;
      border-radius: 50%;
      cursor: pointer;
      z-index: 1;
    }
  }

`;

export default NoteIcon;