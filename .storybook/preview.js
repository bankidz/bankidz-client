import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../src/lib/styles/global-style';
import { theme } from '../src/lib/styles/theme';
import { store } from '../src/store/app/store';
import '../src/assets/fonts/fontStyle.css';

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div
          style={{
            width: '100%',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    </Provider>
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
