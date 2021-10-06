import React, { useContext } from 'react';
import { useObserver } from 'mobx-react';
import { ThemeContext } from 'styled-components';

import { MainHeaderWrapper, HeaderTitle } from '../styles/lnbStyles';
import { ButtonWrapper, TextButtonWrapper } from '../styles/commonStyles';
import {
  ArrowBackIcon2,
  SearchIcon,
  CloseIcon,
  TrashIcon,
  ShareIcon,
  EditIcon,
} from '../../icons';

const MainHeader = ({
  leftButtons,
  title,
  rightButtons,
  backgroundColor,
  isLongPress = false,
}) => {
  const themeContext = useContext(ThemeContext);
  console.log('right', rightButtons);
  const Icon = ({ action, disabled }) => {
    switch (action) {
      case 'back':
        return (
          <ArrowBackIcon2
            width="1.25"
            height="1.25"
            color={isLongPress ? '#FFFFFF' : themeContext.IconNormal2}
          />
        );
      case 'close':
        return (
          <CloseIcon
            width="1.25"
            height="1.25"
            color={isLongPress ? '#FFFFFF' : themeContext.IconNormal2}
          />
        );
      case 'search':
        return (
          <SearchIcon
            width="1.25"
            height="1.25"
            color={isLongPress ? '#FFFFFF' : themeContext.IconNormal2}
          />
        );
      case 'remove':
        return (
          <TrashIcon
            width="1.25"
            height="1.25"
            color={isLongPress ? '#FFFFFF' : themeContext.IconNormal2}
            isButton={true}
          />
        );
      case 'share':
        return (
          <ShareIcon
            width="1.25"
            height="1.25"
            color={isLongPress ? '#FFFFFF' : themeContext.IconNormal2}
            isButton={true}
          />
        );
      case 'edit':
        return (
          <EditIcon
            width="1.25"
            height="1.25"
            color={isLongPress ? '#FFFFFF' : themeContext.IconNormal2}
            isButton={true}
            disabled
          />
        );
      default:
        return null;
    }
  };

  const Buttons = ({ buttons }) => {
    return buttons.map(button => {
      switch (button.type) {
        case 'icon':
          return (
            <ButtonWrapper key={button.action} onClick={button.onClick}>
              <Icon action={button.action} disabled={button.disabled} />
            </ButtonWrapper>
          );
        case 'text':
          return (
            <TextButtonWrapper key={button.text} onClick={button.onClick}>
              {button.text}
            </TextButtonWrapper>
          );
        default:
          return null;
      }
    });
  };

  return useObserver(() => (
    <MainHeaderWrapper
      style={{ backgroundColor: isLongPress ? '#232d3b' : backgroundColor }}
    >
      {leftButtons?.length > 0 && <Buttons buttons={leftButtons} />}
      <HeaderTitle style={{ color: isLongPress ? '#FFFFFF' : themeContext.TextMain }}>
        {title}
      </HeaderTitle>
      {rightButtons?.length > 0 && <Buttons buttons={rightButtons} />}
    </MainHeaderWrapper>
  ));
};
export default React.memo(MainHeader);
