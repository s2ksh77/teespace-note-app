import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { StyledCollapse } from '../../styles/tagStyle';
import TagStore from '../../store/tagStore';
import LoadingImg from '../../assets/Tee_loading.gif';
import { Panel, TagKeyContainer } from '../../styles/tagStyle';
import TagKeyChildren from './TagKeyChildren';
import SearchResultNotFound from '../common/SearchResultNotFound';
import arrowUp from '../../assets/ts_arrow_up_line@3x.png';
import arrowDown from '../../assets/ts_arrow_down_line@3x.png';

const arrowStyle = { width: '0.62rem' };
const arrowPosition = 'right';
const categoryInfo = {
  KOR: 'ㄱ ~ ㅎ',
  ENG: 'A ~ Z',
  NUM: '0 ~ 9',
  ETC: '기타',
};
const defaultActiveArr = ['KOR', 'ENG', 'NUM', 'ETC'];
const TagContentContainer = () => {
  const customExpandIcon = props => {
    if (props.isActive) {
      return <img style={arrowStyle} src={arrowUp} />;
    } else return <img style={arrowStyle} src={arrowDown} />;
  };

  return useObserver(() => (
    <>
      {Object.keys(TagStore.targetTagList).length > 0 ? (
        <StyledCollapse
          defaultActiveKey={defaultActiveArr}
          expandIcon={panelProps => customExpandIcon(panelProps)}
          expandIconPosition={arrowPosition}
        >
          {Object.keys(TagStore.targetTagList).map((category, idx) => {
            return (
              // "ㄱ~ㅎ"
              <Panel header={categoryInfo[category]} key={category}>
                {Object.keys(TagStore.targetTagList[category])?.map(tagKey => {
                  // "ㄱ", "ㄴ" ...
                  return (
                    <TagKeyContainer key={tagKey}>
                      <div>{tagKey}</div>
                      <TagKeyChildren category={category} tagKey={tagKey} />
                    </TagKeyContainer>
                  );
                })}
              </Panel>
            );
          })}
        </StyledCollapse>
      ) : (
        <SearchResultNotFound searchStr={TagStore.searchString} />
      )}
    </>
  ));
};

export default TagContentContainer;
