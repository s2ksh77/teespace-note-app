import styled from 'styled-components';

// contents가 tag일 때
export const EditorHeaderContainer1 = styled.div`
  display: flex;
  flex: auto;
  position: relative;
  align-items: center;
  width: 80%;
`;

export const EditBtn = styled.button`
  width: 4.5rem;
  height: 1.88rem;
  color: white;
  font-size: 0.75rem;
  align-items: center;
  border-radius: 0.25rem;
  border: 0px solid #ffffff;
  background-color: #232D3B;
  &:hover {
    background-color: #4C535D;
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

export const EditorTitle = styled.input`
  display: inline-block;
  width: 100%;
  height:100%;
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
  flex-shrink:0;
  position: relative;
  justify-content:flex-end;
  align-items: center;
  width: auto;  
`;
export const HeaderDivider = styled.div`
  width: 1px;
  height: 24px;
  background: #DDD9D4;
  margin: auto 0.56rem;
`;
export const EditingImg = styled.img`
  margin-right: 0.5rem;
`;

export const ModifiedUser = styled.span`
  color: rgb(0, 0, 0);
  font-size: 0.6875rem;
  padding: 0 0.38rem 0 0 !important;
`;

export const AutoSaveMsg = styled.span`
  color: #2E6360 ;
  font-size: 0.6875rem;
  margin-right:${props=>props.isSaving ? "0.63rem" : "0.31rem"};
`;

export const ModifiedTime = styled.span`
  width: auto;
  height: auto;
  color: rgb(0, 0, 0);
  font-size: 0.6875rem;
  border-left: 1px solid #d8d8d8 !important;
  padding: 0 0.38rem !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const EditorSearchIconDiv = styled.div`
  display: flex;
  padding: 8px;
  &:hover{
    background: #ebe6df;
    border-radius: 0.25rem;
    cursor: pointer;
  }
`

export const EditorSearchIcon = styled.img`
  filter: invert(49%) sepia(5%) saturate(429%) hue-rotate(349deg) brightness(93%) contrast(92%);
`

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
  background-color: #232D3B;
  min-width:4.5rem;
  &:hover {
    background-color: #4C535D;
    cursor: pointer;
  }
  &:focus {
    outline: none;
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
  border: 0rem solid #c6ced6;
  background-color: #F7F4EF;
  &:focus-within {
    background: #FFFFFF;
    border: 1px solid #7B7671;
  }
  box-sizing: border-box;
  margin: auto 0;
  flex:1;
  min-width:10.6rem;
  background-color: ${props => (props.isSearch ? "#FFFFFF;" : "#F7F4EF")}
  border: ${props => (props.isSearch ? "1px solid #7B7671;" : "0rem solid #c6ced6;")}
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
  font-size: 0.81rem !important;
  background-color: inherit;
  border: 0rem;
  overflow: hidden;
  outline: none;
  &:focus{
    background: #FFFFFF;
    outline: none;
  }
  background-color: ${props => (props.isSearch ? "#FFFFFF;" : "inherit;")}
  line-height: 1;
`;

export const TagSearchForm = styled.form`
  display:${props => props.show ? "block" : "none"};
  margin-left:auto;
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
  background-color: ${props => (props.isSearch ? "#FFFFFF;" : "#F7F4EF;")}
  border: ${props => (props.isSearch ? "1px solid #7B7671;" : "0rem solid #c6ced6;")}
`;
