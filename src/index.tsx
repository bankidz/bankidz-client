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
import ReactGA from 'react-ga';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

const queryClient = new QueryClient();

ReactModal.setAppElement('#root');

const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID;
ReactGA.initialize(TRACKING_ID!);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ModalsContextProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <App />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              closeButton={false}
            />
            <GlobalBottomSheet />
          </QueryClientProvider>
        </ModalsContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
);
