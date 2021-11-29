import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    blue: '#5454ed',
    background: '#2d3e50',
  },
};

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
`;
