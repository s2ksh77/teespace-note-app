import styled from "styled-components";

export const Page = styled.li`
  display: flex;
  width: 100%;
  height: 2.81rem;
  cursor: pointer;
  &:hover .ellipsisBtn{
      display: flex !important;
    }
  }
  &:hover:not(.ellipsisBtn){
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const PageMargin = styled.span`
  flex: 0 0 1.875rem;
  height: 100%;
  display: flex;
`;

export const PageTextCover = styled.span`
  width: 100%;
  border-bottom: 0.0625rem solid #dadada;
  display: flex;
  flex: auto;
  min-width: calc(100% - 1.875rem);
  max-width: calc(100% - 2.7rem);
  padding-right: 0.25rem;
  box-sizing: border-box;
`;

export const PageText = styled.a`
  display: inline-block;
  cursor: pointer;
  margin-left: 1.25rem;
  line-height: 130%;
  color: #000000;
  align-self: center;
  max-width: calc(100% - 2rem);
  min-width: calc(100% - 2.775rem);
  overflow: hidden;
  /* text-overflow: ellipsis; */
  white-space: nowrap;
  font-weight: 300;
  &:hover {
    color: #000000;
  }
`;

export const PageEllipsis = styled.span`
  display: none;
  align-self: center;
  flex: 0 0 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  border-radius: 1.5rem 1.5rem;
  align-items: center;
  justify-content: center;
  color: #75757f;
  &:hover {
    background-color: rgba(30, 168, 223, 0.2);
  }
`;

export const NewPage = styled.span`
  display: flex;
  height: 2.81rem;
  align-items: center;
  color: #0090ca;
  /* margin-left: 2.94rem; */
  border-bottom: 0.0625rem solid #dadada;
`;
export const NewPageBtn = styled.p`
  width: 9.38rem;
  height: 1.88rem;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 1.06rem;
  cursor: pointer;
  &:hover {
    background: rgba(30, 168, 223, 0.2);
    border-radius: 0.94rem;
  }
`;
export const NewPageText = styled.span`
  display: inline-block;
  cursor: pointer;
  align-self: center;
  line-height: 100%;
`;

export const EllipsisIcon = styled.i`
  background-image: url("../Assets/view_more.png");
  color: #75757f;
  width: 100%;
  height: 100%;
`;
