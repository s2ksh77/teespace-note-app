import styled from 'styled-components';

// contents가 tag일 때
export const EditorHeaderContainer1 = styled.div`
  display: flex;
  flex: auto;
  position: relative;
  align-items: center;
  width: 80%;
  color: ${props => props.theme.TextMain};
`;

export const EditBtn = styled.button`
  width: 4.5rem;
  height: 1.88rem;
  margin-right: 1rem;
  color: white;
  font-size: 0.75rem;
  align-items: center;
  border-radius: 0.25rem;
  border: 0px solid #ffffff;
  background-color: ${props => props.theme.CoreNormal};
  &:hover {
    background-color: ${props => props.theme.CoreBright};
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  &:active {
    background: ${props => props.theme.CoreDark};
  }
  &:disabled {
    background: ${props => props.theme.DisabledShape};
    color: #fff;
    border: 0;
    cursor: not-allowed;
  }
`;

export const EditorTitle = styled.input`
  display: inline-block;
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
  padding: 0.1875rem 0.1875rem 0.1875rem 0rem;
  background-image: none;
  border-radius: 0.125rem;
  color: inherit;
  font-size: 0.875rem;
  font-style: inherit;
  font-weight: inherit;
  background-color: inherit;
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
  color: ${props => props.theme.TextSub};
`;
export const HeaderDivider = styled.div`
  width: 1px;
  height: 24px;
  background: ${props => props.theme.LineMain};
  margin: auto 0.56rem;
`;
export const EditingImg = styled.img`
  margin-right: 0.5rem;
`;

export const ModifiedUser = styled.span`
  font-size: 0.6875rem;
  padding: 0 0.38rem 0 0 !important;
`;

export const AutoSaveMsg = styled.span`
  font-size: 0.6875rem;
  margin-right: 0.5rem;
`;

export const ModifiedTime = styled.span`
  width: auto;
  height: auto;
  font-size: 0.6875rem;
  border-left: 1px solid ${props => props.theme.LineMain} !important;
  padding: 0 0.38rem !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const EditorSearchIconDiv = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${props => props.theme.BeigeBright};
    border-radius: 0.25rem;
    cursor: pointer;
  }
`;

export const EditorSearchIcon = styled.img`
  width: 1rem;
  height: 1rem;
  filter: invert(49%) sepia(5%) saturate(429%) hue-rotate(349deg)
    brightness(93%) contrast(92%);
`;

export const LnbTitleCover = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 3rem;
  padding: 0 0.75rem 0 1rem;
  align-items: center;
  box-sizing: border-box;
`;

export const LnbTitleNewButton = styled.button`
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
  background-color: ${props => props.theme.CoreNormal};
  min-width: 4.5rem;
  &:hover {
    background-color: ${props => props.theme.CoreLight};
    cursor: pointer;
  }
  &:active {
    background: ${props => props.theme.CoreDark};
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background: ${props => props.theme.DisabledShape};
    color: #fff;
    border: 0;
    cursor: not-allowed;
  }
`;

export const LnbTitleSearchContainer = styled.form`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0 0.63rem;
  width: 14.81rem;
  height: 1.88rem;
  border-radius: 6px;
  &:hover {
    background-color: ${props => props.theme.SubStateBright};
    path {
      fill: ${props => props.theme.IconNormal};
    }
  }
  &:focus-within {
    background-color: ${props => props.theme.StateNormal};
    border: 1px solid ${props => props.theme.SubStateVivid};
    path {
      fill: ${props => props.theme.IconActive};
    }
  }
  box-sizing: border-box;
  margin: auto 0;
  flex: 1;
  min-width: 10.6rem;
  background-color: ${props => props.theme.SubStateNormal};
  border: 1px solid ${props => props.isTagSearching ? props.theme.SubStateVivid : 'transparent'};
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

export const LnbTitleSearchInput = styled.input`
  flex: auto;
  width: 13.3rem;
  align-self: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.theme.TextMain};
  background-color: inherit;
  border: 0rem;
  overflow: hidden;
  outline: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.TextHinted}
  }
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
  box-sizing: border-box;
  &:hover {
    background-color: ${props => props.theme.SubStateBright};
    path {
      fill: ${props => props.theme.IconNormal};
    }
  }
  &:focus-within {
    background-color: ${props => props.theme.StateNormal};
    border: 1px solid ${props => props.theme.SubStateVivid};
    path {
      fill: ${props => props.theme.IconActive};
    }
  }
  background-color: ${props => props.theme.SubStateNormal};
  border: 1px solid transparent;
`;
