import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../src/lib/styles/global-style';
import { theme } from '../src/lib/styles/theme';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      mobile1: {
        name: 'iPhone 13 mini',
        styles: {
          width: '375px',
          height: '812px',
        },
        type: 'mobile',
      },
      mobile2: {
        name: 'iPhone 13 / 13 pro',
        styles: {
          width: '390px',
          height: '844px',
        },
        type: 'mobile',
      },
      tablet1: {
        name: 'iPad Pro 11"',
        styles: {
          width: '834px',
          height: '1194px',
        },
        type: 'tablet',
      },
    },
    defaultViewport: 'mobile1',
  },
  paddings: {
    values: [
      { name: 'none', value: '0px' },
      { name: 'default', value: '18px' },
    ],
    default: 'none',
  },
};
