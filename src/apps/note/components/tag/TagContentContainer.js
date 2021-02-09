import React from 'react';
import { observer } from 'mobx-react';
import { PanelHeader, StyledCollapse } from '../../styles/tagStyle';
import TagStore from '../../store/tagStore';
import { TagKeyContainer, PanelArrow } from '../../styles/tagStyle';
import TagKeyChildren from './TagKeyChildren';
import arrowUp from '../../assets/ts_arrow_up_line@3x.png';
import arrowDown from '../../assets/ts_arrow_down_line@3x.png';
import NoteStore from '../../store/noteStore';

const defaultActiveArr = ['KOR', 'ENG', 'NUM', 'ETC'];

const customExpandIcon = props => {
  if (props.isActive) return <PanelArrow src={arrowUp} alt="arrow-up" />;
  return <PanelArrow src={arrowDown} alt="arrow-down" />;
};

const TagContentContainer = observer(() => {
  const categoryInfo = {
    KOR: NoteStore.getI18n('korCategory'),
    ENG: NoteStore.getI18n('engCategory'),
    NUM: NoteStore.getI18n('numCategory'),
    ETC: NoteStore.getI18n('etcCategory'),
  };
  
  return (
    <>
      <StyledCollapse
        defaultActiveKey={defaultActiveArr}
        expandIcon={panelProps => customExpandIcon(panelProps)}
        expandIconPosition={'right'}
      >
        {Object.keys(TagStore.sortedTagList).map((category, idx) => {
          return (
            // "ㄱ~ㅎ"
            <PanelHeader header={categoryInfo[category]} key={category} >
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
          );
        })}
      </StyledCollapse>
    </>
  );
});

export default TagContentContainer;
