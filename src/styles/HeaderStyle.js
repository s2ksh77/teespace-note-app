import styled, { css } from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 3rem;
  padding: 0 1rem;
  align-items: center;
  box-sizing: border-box;
`;

export const BackButton = styled.img`
  width: 1rem;
  height: 1rem;
  cursor: pointer;
`;

export const NewChapterButton = styled.button`
  align-items: center;
  display: flex;
  width: fit-content;
  height: 1.88rem;
  padding-left: 12px;
  padding-right: 12px;
  line-height: 100%;
  margin-right: 0.63rem;
  color: #ffffff;
  font-size: 0.75rem;
  justify-content: center;
  border: 0px solid #ffffff;
  border-radius: 0.25rem;
  background-color: #232d3b;
  min-width: 4.5rem;
  &:hover {
    background-color: #4c535d;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

export const LNBSearchBar = styled.form`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0 0.63rem;
  width: 14.81rem;
  height: 1.88rem;
  border-radius: 6px;
  border: 1px solid transparent;
  background-color: #f7f4ef;
  &:focus-within {
    background: #ffffff;
    border: 1px solid #7b7671;
  }
  box-sizing: border-box;
  flex: 1;
  min-width: 10.6rem;
  background-color: ${props => (props.isSearch ? '#ffffff' : '#f7f4ef')};
  border: ${props =>
    props.isSearch ? '1px solid #7b7671' : '1px solid transparent'};
`;

export const LNBSearchInput = styled.input`
  flex: auto;
  width: 13.3rem;
  align-self: center;
  font-size: 0.81rem !important;
  background-color: inherit;
  border: 0rem;
  overflow: hidden;
  outline: none;
  &:focus {
    background: #ffffff;
    outline: none;
  }
  &::placeholder {
    color: #c9c4be;
  }
  background-color: ${props => (props.isSearch ? '#ffffff' : 'inherit')};
`;

export const SearchCancelButton = styled.img`
  width: 0.75rem;
  height: 0.75rem;
  cursor: pointer;
  ${props =>
    !props.visible &&
    css`
      display: none;
    `}
`;

export const EditButton = styled.button`
  min-width: 4.5rem;
  height: 1.88rem;
  color: white;
  font-size: 0.75rem;
  align-items: center;
  border-radius: 0.25rem;
  border: 0;
  margin-right: 1rem;
  background-color: #232d3b;
  &:hover {
    background-color: #4c535d;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background: #ccc;
    color: #fff;
    border: 0;
    cursor: not-allowed;
  }
`;

export const PageContentTitle11 = styled.span`
  width: 100%;
  margin-right: 1rem;
  font-size: 0.81rem;
  border: 0;
  background-color: #ffffff;
  color: #000000 !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AutoSaveMessage = styled.span`
  color: #2e6360;
  font-size: 0.6875rem;
  margin-right: ${props => (props.isSaving ? '0.63rem' : '0.31rem')};
`;

export const EditingIcon = styled.img`
  margin-right: 0.5rem;
`;

export const SmallText = styled.span`
  font-size: 0.6875rem;
  padding: 0 0.38rem 0 0 !important;
`;

export const ModifiedUser = styled.span`
  font-size: 0.6875rem;
  padding-right: 0.38rem;
  border-right: 1px solid #d8d8d8;
`;

export const ModifiedTime = styled.span`
  font-size: 0.6875rem;
  padding: 0 0.75rem 0 0.38rem;
`;

export const SearchIcon = styled.img`
  display: flex;
  padding: 8px;
  filter: invert(49%) sepia(5%) saturate(429%) hue-rotate(349deg)
    brightness(93%) contrast(92%);
  &:hover {
    background: #ebe6df;
    border-radius: 0.25rem;
    cursor: pointer;
  }
`;

/** 여기 아래부터 아직 안 쓰이는 곳 */

// contents가 tag일 때
export const EditorHeaderContainer1 = styled.div`
  display: flex;
  flex: auto;
  position: relative;
  align-items: center;
  width: 80%;
`;

export const PageContentTitle = styled.input`
  display: inline-block;
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0.1875rem 0.1875rem 0.1875rem 0.75rem;
  background-image: none;
  border-radius: 0.125rem;
  color: inherit;
  font-size: 0.875rem;
  font-style: inherit;
  font-weight: inherit;
  background-color: #ffffff;
  border: 0rem solid #d3dbdf !important;
`;

export const EditorHeaderContainer2 = styled.div`
  display: flex;
  flex: auto;
  flex-shrink: 0;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  width: auto;
`;

export const LnbTitleSearchIcon = styled.button`
  display: flex;
  user-select: none;
  font-size: 0.82rem;
  color: #c6ced6;
  margin-right: 0.43rem;
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;
`;

export const TagSearchForm = styled.form`
  display: ${props => (props.show ? 'block' : 'none')};
  margin-left: auto;
`;

export const TagTitleSearchContainer = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 0.63rem;
  width: 10.5rem;
  height: 1.88rem;
  border-radius: 6px;
  border: 0rem solid #c6ced6;
  background-color: #F7F4EF;
  box-sizing: border-box;
  &:focus-within {
    background: #FFFFFF;
    border: 1px solid #7B7671;
  }
  background-color: ${props => (props.isSearch ? '#FFFFFF;' : '#F7F4EF;')}
  border: ${props =>
    props.isSearch ? '1px solid #7B7671;' : '0rem solid #c6ced6;'}
`;
