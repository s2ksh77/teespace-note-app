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
  width: 3.5rem;
  height: 1.69rem;
  color: white;
  font-size: 0.75rem;
  align-items: center;
  border-radius: 0.25rem;
  border: 0px solid #ffffff;
  background-color: #008cc8;
  &:hover {
    background-color: #1ea8df;
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

export const EditingImg = styled.img`
  width: 1.13rem;
  margin-right: 0.5rem;
`;

export const ModifiedUser = styled.span`
  width: auto;
  height: auto;
  color: rgb(0, 0, 0);
  font-size: 0.6875rem;
  border-width: 0px;
  border-style: solid;
  padding: 0 0.38rem 0 0 !important;
`;

export const ModifiedTime = styled.span`
  width: auto;
  height: auto;
  color: rgb(0, 0, 0);
  font-size: 0.6875rem;
  border-left: 1px solid #d8d8d8 !important;
  padding: 0 0 0 0.38rem !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const LnbTitleCover = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  border-bottom: 0.0625rem solid #dadada;
  padding: 0.63rem;
  box-sizing: border-box;
`;

export const LnbTitleNewButton = styled.button`
  align-items: center;
  display: flex;
  width: 6.31rem;
  height: 1.88rem;
  margin-right: 0.63rem;
  color: #ffffff;
  font-size: 0.8125rem;
  justify-content: center;
  border: 0px solid #ffffff;
  border-radius: 25px;
  background-color: #008cc8;
  min-width:3rem;
  &:hover {
    background-color: #1ea8df;
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
  border-radius: 1.563rem 1.563rem;
  border: 0.0625rem solid #c6ced6;
  box-sizing: border-box;
  margin: auto 0;
  flex:1;
  min-width:10.6rem;
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
