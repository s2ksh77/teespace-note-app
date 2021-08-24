import React, { useContext } from 'react';
import { useObserver } from 'mobx-react';
import { ThemeContext } from 'styled-components';

import { MainHeaderWrapper, HeaderTitle } from '../styles/lnbStyles';
import { ButtonWrapper, TextButtonWrapper } from '../styles/commonStyles';
import { ArrowBackIcon2, SearchIcon, CloseIcon } from '../../icons';

const MainHeader = ({ leftButtons, title, rightButtons, backgroundColor }) => {
  const themeContext = useContext(ThemeContext);

  const Icon = ({ action }) => {
    switch (action) {
      case 'back':
        return (
          <ArrowBackIcon2 width="1.25" height="1.25" color={themeContext.IconNormal2} />
        );
      case 'close':
        return <CloseIcon width="1.25" height="1.25" color={themeContext.IconNormal2} />;
      case 'search':
        return <SearchIcon width="1.25" height="1.25" color={themeContext.IconNormal2} />;
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
              <Icon action={button.action} />
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
    <MainHeaderWrapper style={{ backgroundColor }}>
      {leftButtons?.length > 0 && <Buttons buttons={leftButtons} />}
      <HeaderTitle>{title}</HeaderTitle>
      {rightButtons?.length > 0 && <Buttons buttons={rightButtons} />}
    </MainHeaderWrapper>
  ));
};
export default React.memo(MainHeader);
