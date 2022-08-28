import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/app/store';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { theme } from './lib/styles/theme';
import { GlobalStyle } from './lib/styles/global-style';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/fonts/fontStyle.css';
import 'react-spring-bottom-sheet/dist/style.css';
import './assets/fonts/fontStyle.css';
import ReactModal from 'react-modal';
import { ModalsContextProvider } from './components/common/modals/ModalsContext';
import GlobalBottomSheet from '@components/common/bottomSheets/GlobalBottomSheet';

const container = document.getElementById('root')!;
const root = createRoot(container);

const queryClient = new QueryClient();

ReactModal.setAppElement('#root');

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ModalsContextProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <App />
            <GlobalBottomSheet />
          </QueryClientProvider>
        </ModalsContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
