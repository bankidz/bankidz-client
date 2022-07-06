import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../src/lib/styles/global-style';
import { theme } from '../src/lib/styles/theme';
import '../src/assets/fonts/fontStyle.css';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div
        style={{
          backgroundColor: '#F7F7F8',
          width: '100%',
          height: 'calc(var(--vh, 1vh) * 100)',
        }}
      >
        <Story />
      </div>
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
          width: '360px',
          height: '740px',
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
    defaultViewport: 'mobile2',
  },
  paddings: {
    values: [
      { name: 'none', value: '0px' },
      { name: 'default', value: '18px' },
    ],
    default: 'none',
  },
};
