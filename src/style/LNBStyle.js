import styled from 'styled-components';

export const LNBWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 19.375rem;
  height: 100%;
  font-size: 0.938rem;
  border-right: 1px solid #ebebeb;
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  height: 2.75rem;
  padding: 0 1rem;
  align-items: center;
  &:hover {
    background-color: #faf8f7;
  }
`;

export const ItemTitle = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NoteTitle = styled.div`
  height: 3.5rem;
  color: #191919;
  font-weight: 500;
  padding: 16px;
  font-size: 20px;
  line-height: 24px;
`;
