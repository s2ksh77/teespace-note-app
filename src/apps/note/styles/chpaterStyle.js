import styled from "styled-components";

export const ChapterContainerUl = styled.ul`
  position: relative;
  user-select: none;
  margin: 0rem 0.81rem 0rem 0.81rem;
  padding: 0rem;
  display: flex;
  flex-direction: column;
  font-size: 0.81rem;
  height: auto;
  width: auto;
  &.folded{
    .page-li {
      display: none;
    }
  }
}
`;
export const ChapterUlDIV = styled.div`
  height: 2.81rem;
  display: flex;
  font-weight: 500;
  border-bottom: 0.0625rem solid #dadada;
  &:hover .ellipsisBtn {
    display: flex !important;
  }
  &:hover:not(.ellipsisBtn) {
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const ChapterColorDiv = styled.span`
  display: flex;
  width: fit-content;
  align-items: center;
`;

export const ChapterColorSpan = styled.span`
  width: 0.25rem;
  height: 2.19rem;
  align-self: center;
  border-radius: 0.13rem / 0.13rem;
  color: ${(props) => props.color};
  background: ${(props) => props.background};
`;

export const ChapterTextContainer = styled.span`
  display: flex;
  flex: auto;
  margin-left: 1.19rem;
  margin-right: 0.2rem;
  height: 100%;
  font-weight: 500;
  max-width: calc(100% - 3.36rem);
  align-items: center;
  cursor: pointer;
`;

export const ChapterTextSpan = styled.span`
  overflow: hidden;
  max-width: 100%;
  min-width: calc(100% - 1.3rem);
  line-height: normal;
  font-weight: 400;
`;
export const ChapterTextEllipsis = styled.span`
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

export const ChapterFolderBtn = styled.span`
  display: flex;
  align-self: center;
  flex: 0 0 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.5rem 1.5rem;
  align-items: center;
  cursor: pointer;
  margin-left: 0.2rem;
  justify-content: center;
`;

export const ChapterInput = styled.input`
  font-size: 0.81rem !important;
  color: #000000 !important;
  height: 50%;
  width: calc(100% - 1.6rem);
  max-width: calc(100% - 1.6rem);
  overflow: hidden;
  align-self: center;
  border: 0rem !important;
  background-color: transparent !important;
  margin-right: 0.9375rem;
  padding-right: 0.3125rem;
  &::placeholder {
    color: #d0d0d0;
  }
  &::selection {
    background: rgba(30, 168, 223, 0.2);
    color: #000000;
  }
  &:focus {
    outline: none;
  }
`;
