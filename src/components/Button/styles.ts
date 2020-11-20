import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 280px;
  height: 40px;
  background: #04d361;
  border-radius: 5px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#04d361')};
  }
`;
