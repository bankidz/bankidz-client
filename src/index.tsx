import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/app/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './lib/styles/global-style';
import { ThemeProvider } from 'styled-components';
import { theme } from './lib/styles/theme';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
