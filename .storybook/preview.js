import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../src/lib/styles/global-style';
import { theme } from '../src/lib/styles/theme';
import { store } from '../src/store/app/store';
import { ModalsContextProvider } from '../src/components/atoms/modals/ModalsContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../src/assets/fonts/fontStyle.css';
import { BrowserRouter } from 'react-router-dom';
import { themes } from '@storybook/theming';

const queryClient = new QueryClient();

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <ModalsContextProvider>
            <QueryClientProvider client={queryClient}>
              <GlobalStyle />
              <div
                style={{
                  width: '100%',
                  // backgroundColor: '#FAFAFC',
                  // padding: '18px',
                  boxSizing: 'border-box',
                }}
              >
                <Story />
              </div>
            </QueryClientProvider>
          </ModalsContextProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  ),
];

export const parameters = {
  docs: {
    inlineStores: false,
  },
  darkMode: {
    dark: { ...themes.dark, appBg: '#2E3234' },
    light: { ...themes.normal, appBg: 'white' },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  paddings: {
    values: [
      { name: 'margin-template', value: '18px' },
      { name: 'none', value: '0px' },
    ],
    default: 'margin-template',
  },
  backgrounds: {
    values: [
      { name: 'bankidz-black', value: '#2E3234' },
      { name: 'bankidz-grey100', value: '#FAFAFC' },
    ],
    default: 'bankidz-black',
  },
  viewport: {
    viewports: {
      mobile1: {
        name: 'iPhone 13 mini',
        styles: {
          width: '375px',
          height: '812px',
        },
        type: 'small mobile',
      },
      mobile2: {
        name: 'iPhone 13 / 13 pro',
        styles: {
          width: '360px',
          height: '740px',
        },
        type: 'big mobile',
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
  },
};
