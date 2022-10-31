import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../src/lib/styles/global-style';
import { theme } from '../src/lib/styles/theme';
import { store } from '../src/store/app/store';
import { ModalsContextProvider } from '../src/components/common/modals/ModalsContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../src/assets/fonts/fontStyle.css';
import { BrowserRouter } from 'react-router-dom';

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
                  backgroundColor: '#FAFAFC',
                  padding: '18px',
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
  },
  paddings: {
    values: [
      { name: 'none', value: '0px' },
      { name: 'default', value: '18px' },
    ],
    default: 'none',
  },
};
