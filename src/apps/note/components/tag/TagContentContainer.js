import React from 'react';
import { observer } from 'mobx-react';
import { PanelHeader, StyledCollapse } from '../../styles/tagStyle';
import TagStore from '../../store/tagStore';
import { Panel, TagKeyContainer } from '../../styles/tagStyle';
import TagKeyChildren from './TagKeyChildren';
import arrowUp from '../../assets/ts_arrow_up_line@3x.png';
import arrowDown from '../../assets/ts_arrow_down_line@3x.png';

const categoryInfo = {
  KOR: 'ㄱ ~ ㅎ',
  ENG: 'A ~ Z',
  NUM: '0 ~ 9',
  ETC: '기타',
};
const defaultActiveArr = ['KOR', 'ENG', 'NUM', 'ETC'];

const customExpandIcon = props => {
  if (props.isActive) {
    return <img style={{ width: '0.8rem', top: '27px' }} src={arrowUp} alt="arrow-up" />;
  } else return <img style={{ width: '0.8rem', top: '27px' }} src={arrowDown} alt="arrow-down" />;
};

const TagContentContainer = observer(() => {
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
