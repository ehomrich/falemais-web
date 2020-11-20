import styled, { css } from 'styled-components';

interface ContainerProps {
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  color: #666360;
  border-radius: 10px;
  padding: 10px;
  width: 300px;

  display: flex;
  align-items: flex-start;
  flex-direction: column;

  input {
    flex: 1;
    width: 100%;
    height: 70px;
    font-size: 14px;
    color: #3a3a3a;
    border: 1px solid #a8a8b3;
    padding: 8px 12px;
    border-radius: 5px;

    &::placeholder {
      color: #a8a8b3;
    }

    ${({ isErrored }) =>
      isErrored &&
      css`
        border-color: #c53030;
      `}
  }
`;

export const InputError = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
  font-size: 12px;
`;
