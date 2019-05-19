import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
`;

export const GlobalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const GlobalArea = styled.div`
  border: 1px solid black;
  width: ${props => props.width ? props.width : undefined};
  height: ${props => props.height ? props.height : '550px'};
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
