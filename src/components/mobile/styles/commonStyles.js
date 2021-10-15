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
  color: ${props => (props.disabled ? '#CCCCCC' : props.theme.TextPoinGreen)};
  cursor: ${props => (props.disabled ? 'not-allowed' : null)};
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 1.875rem;
  align-items: center;
  margin-right: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.IconNormal};
`;

export const SearchBarInput = styled.input`
  display: flex;
  flex: 1;
  font-size: 0.813rem;
  font-weight: 500;
  margin: 0 0.5rem;
  border: none;
  &::placeholder {
    color: ${props => props.theme.TextHinted};
  }
`;
