import './assets/fonts/fontStyle.css';
import './components/common/bottomSheet/bottomSheetStyle.css';
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

const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setScreenSize();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
