import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useNoteStore from '../../store/useStore';

import {
  PanelHeader,
  StyledCollapse,
  TagKeyContainer,
  PanelArrow,
} from '../../styles/tagStyle';
import { Divider } from '../../styles/commonStyle';
import arrowUp from '../../assets/ts_arrow_up_line@3x.png';
import arrowDown from '../../assets/ts_arrow_down_line@3x.png';
import TagKeyChildren from './TagKeyChildren';

const TagContentContainer = observer(({ isWeb = true }) => {
  const { TagStore } = useNoteStore();
  const { t } = useTranslation();

  const defaultActiveKey = Object.entries(TagStore.sortedTagList)
    .filter(([, tags]) => Object.keys(tags).length)
    .map(([category]) => category);

  const categoryInfo = {
    KOR: t('NOTE_TAG_TAG_MENU_01'),
    ENG: t('NOTE_TAG_TAG_MENU_02'),
    NUM: t('NOTE_TAG_TAG_MENU_03'),
    ETC: t('NOTE_TAG_TAG_MENU_04'),
  };

  const renderDivider = category => {
    if (isWeb) return null;
    if (category) return null;
    return <Divider />;
  };

  return (
    <>
      <StyledCollapse
        defaultActiveKey={defaultActiveKey}
        expandIcon={({ isActive }) =>
          isActive ? <PanelArrow src={arrowUp} /> : <PanelArrow src={arrowDown} />
        }
        expandIconPosition="right"
        style={isWeb ? null : { backgroundColor: 'white', border: 'none' }}
      >
        {Object.keys(TagStore.sortedTagList).map(category => {
          return (
            // "ㄱ~ㅎ"
            <React.Fragment key={category}>
              <PanelHeader
                header={categoryInfo[category]}
                key={category}
                style={{ border: 'none' }}
              >
                {Object.keys(TagStore.sortedTagList[category])?.map(tagKey => {
                  // "ㄱ", "ㄴ" ...
                  return (
                    <TagKeyContainer key={tagKey}>
                      <div>{tagKey}</div>
                      <TagKeyChildren category={category} tagKey={tagKey} />
                    </TagKeyContainer>
                  );
                })}
              </PanelHeader>
              {renderDivider(categoryInfo[category] === t('NOTE_TAG_TAG_MENU_04'))}
            </React.Fragment>
          );
        })}
      </StyledCollapse>
    </>
  );
});

export default React.memo(TagContentContainer);
