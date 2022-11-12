import { Route, Routes, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import OnBoardingRouter from '@components/pages/OnBoarding';
import ServiceRouter from '@components/pages/ServiceRouter';
import NotFound from '@components/pages/NotFound';
import Layout from '@components/atoms/layout/Layout';
import GroupLink from '@components/blocks/mypage/GroupLink';
import RouteChangeTracker from '@components/blocks/auth/RouteChangeTracker';
import useAPIError from '@lib/hooks/globalErrorHandler/useAPIError';
import PersistLogin from '@components/blocks/auth/PersistLogin';
import RequireAuth from '@components/blocks/auth/RequireAuth';
import ThemeColor from '@components/atoms/ThemeColor';

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
    <>
      <ThemeColor />
      <Routes location={location}>
        <Route element={<Layout />}>
          <Route path="/auth/*" element={<OnBoardingRouter />} />
          <Route path="/link/:groupCode" element={<GroupLink />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/*" element={<ServiceRouter />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
