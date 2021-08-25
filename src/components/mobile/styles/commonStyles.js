/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  display: flex;
  & + div {
    margin-left: 1rem;
  }
`;

export const TextButtonWrapper = styled.div`
  display: flex;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => props.theme.TextPoinGreen};
`;
