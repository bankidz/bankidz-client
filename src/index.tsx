import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/app/store';
import { ThemeProvider } from 'styled-components';
import { theme } from './lib/styles/theme';
import { GlobalStyle } from './lib/styles/global-style';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/fonts/fontStyle.css';
import 'react-spring-bottom-sheet/dist/style.css';
import './assets/fonts/fontStyle.css';
import ReactModal from 'react-modal';
import { ModalsContextProvider } from './components/common/modals/ModalsContext';

const container = document.getElementById('root')!;
const root = createRoot(container);
const setScreenSize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};
setScreenSize();

ReactModal.setAppElement('#root');

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ModalsContextProvider>
          <App />
        </ModalsContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
