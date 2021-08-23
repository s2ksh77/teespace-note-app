import styled from 'styled-components';

export const MainHeader = styled.div`
  display: flex;
  width: 100%;
  height: 2.875rem;
  margin: 0;
  padding: 0.625rem 1rem;
`;

export const HeaderTitle = styled.span`
  display: flex;
  font-size: 0.938rem;
  font-weight: 400;
  color: ${props => props.theme.TextMain};
  margin-left: 0.75rem;
  flex: 1 auto;
`;
