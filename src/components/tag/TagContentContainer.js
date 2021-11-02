import React from 'react';
import { observer } from 'mobx-react';
import { PanelHeader, StyledCollapse } from '../../styles/tagStyle';
import TagStore from '../../store/tagStore';
import { TagKeyContainer, PanelArrow } from '../../styles/tagStyle';
import TagKeyChildren from './TagKeyChildren';
import arrowUp from '../../assets/ts_arrow_up_line@3x.png';
import arrowDown from '../../assets/ts_arrow_down_line@3x.png';
import NoteStore from '../../store/noteStore';
import { useTranslation } from 'react-i18next';
import { Divider } from '../../styles/commonStyle';


const customExpandIcon = props => {
  if (props.isActive) return <PanelArrow src={arrowUp} alt="arrow-up" />;
  return <PanelArrow src={arrowDown} alt="arrow-down" />;
};

const TagContentContainer = observer(({ isWeb = true }) => {
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
    else if (category) return null;
    else return <Divider />;
  };

  return (
    <>
      <StyledCollapse
        expandIcon={panelProps => customExpandIcon(panelProps)}
        expandIconPosition={'right'}
        style={isWeb ? null : { backgroundColor: 'white' }}
        defaultActiveKey={defaultActiveKey}
      >
        {Object.keys(TagStore.sortedTagList).map(category => {
          return (
            // "ㄱ~ㅎ"
            <>
              <PanelHeader header={categoryInfo[category]} key={category}>
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
            </>
          );
        })}
      </StyledCollapse>
    </>
  );
});

export default React.memo(TagContentContainer);
