import styled from "styled-components";

export const EditorTitle = styled.div`
  white-space: nowrap;
  width: calc(100% - 0px);
  height: 3rem;
  display: flex;
  flex-direction: row;
  padding: 0 0.75rem !important;
  box-sizing: border-box;
`;

export const EditorTitleContainer1 = styled.div`
  display: flex;
  flex: auto;
  position: relative;
  align-items: center;
  width: 80%;
`;

export const EditorTitleButton = styled.button`
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
`;

export const EditorTitleTextField = styled.input`
  display: inline-block;
  width: 100%;
  outline: none;
  box-sizing: border-box;
  padding: 0.1875rem 0.75rem;
  background-image: none;
  border-radius: 0.125rem;
  color: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  background-color: #ffffff;
  border: 0rem solid #d3dbdf !important;
`;

export const EditorTitleContainer2 = styled.div`
  display: flex;
  flex: auto;
  position: relative;
  align-items: center;
  width: 20%;
`;

export const EditorTitleModifiedUser = styled.span`
  width: auto;
  height: auto;
  color: rgb(0, 0, 0);
  font-size: 0.6875rem;
  border-width: 0px;
  border-style: solid;
  padding: 0 0.38rem 0 0 !important;
`;

export const EditorTitleModifiedTime = styled.span`
  width: auto;
  height: auto;
  color: rgb(0, 0, 0);
  font-size: 0.6875rem;
  border-left: 1px solid #d8d8d8 !important;
  padding: 0 0 0 0.38rem !important;
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
  &:hover {
    background-color: #1ea8df;
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;

export const LnbTitleSearchContainer = styled.div`
  display: inline-flex;
  align-items: center;
  padding-left: 0.63rem;
  width: 14.81rem;
  height: 1.88rem;
  border-radius: 1.563rem 1.563rem;
  border: 0.0625rem solid #c6ced6;
  box-sizing: border-box;
  flex: 1;
`;

export const LnbTitleSearchIcon = styled.span`
  display: flex;
  user-select: none;
  font-size: 0.82rem;
  color: #c6ced6;
  margin-right: 0.43rem;
  cursor: pointer;
`;

export const LnbTitleSearchInput = styled.input`
  flex: auto;
  width: 13.3rem;
  align-self: center;
  font-size: 0.81rem !important;
  border: 0rem;
  overflow: hidden;
  border-radius: 25px;
  outline: none;
`;
