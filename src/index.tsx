import React from 'react';
import { Provider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/fonts/fontStyle.css';
import 'react-spring-bottom-sheet/dist/style.css';
import ReactModal from 'react-modal';
import ReactGA from 'react-ga';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { ModalsContextProvider } from './components/shared/modals/ModalsContext';
import { GlobalStyle } from './lib/styles/global-style';
import { theme } from './lib/styles/theme';
import { store } from './store/app/store';
import GlobalBottomSheet from '@components/shared/bottomSheets/GlobalBottomSheet';
import 'react-toastify/dist/ReactToastify.css';
import Modals from '@components/shared/modals/Modals';
import '@components/shared/layout/transition.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

const queryClient = new QueryClient();

ReactModal.setAppElement('#root');

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
ReactGA.initialize(TRACKING_ID!);

const StyledToastContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  .Toastify__toast-body {
    ${({ theme }) => theme.typo.popup.S_15_R};
    color: ${({ theme }) => theme.palette.greyScale.black};
    line-height: 150%;
  }
`;

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ModalsContextProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <HelmetProvider>
              <App />
            </HelmetProvider>
            <StyledToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              draggable
              pauseOnHover
              closeButton={false}
            />
            <Modals />
            <GlobalBottomSheet />
          </QueryClientProvider>
        </ModalsContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
