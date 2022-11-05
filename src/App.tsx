import { Route, Routes, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import OnBoardingRouter from '@pages/OnBoarding';
import TestPage from '@pages/Test/TestPage';
import ServiceRouter from '@pages/ServiceRouter';
import NotFound from '@pages/NotFound';
import Layout from '@components/layout/Layout';
import GroupLink from '@components/mypage/GroupLink';
import RouteChangeTracker from '@components/auth/RouteChangeTracker';
import useAPIError from '@lib/hooks/errorHandler/useAPIError';
import PersistLogin from '@components/auth/PersistLogin';
import RequireAuth from '@components/auth/RequireAuth';
import '@components/layout/transition.css';

function App() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const { handleError } = useAPIError();
  queryClient.setDefaultOptions({
    queries: {
      refetchInterval: 0,
      retry: 0,
      refetchOnWindowFocus: false,
      onError: handleError,
    },
    mutations: {
      onError: handleError,
    },
  });

  RouteChangeTracker();

  return (
    <Routes location={location}>
      <Route element={<Layout />}>
        <Route path="/auth/*" element={<OnBoardingRouter />} />
        <Route path="/link/:groupCode" element={<GroupLink />} />
        <Route path="/test/*" element={<TestPage />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/*" element={<ServiceRouter />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
