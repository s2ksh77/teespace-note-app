import styled from 'styled-components';

export const LNBWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 19.375rem;
  height: 100%;
  font-size: 0.938rem;
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  height: 2.75rem;
  padding: 0 1rem;
  align-items: center;
`;

export const ItemTitle = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
