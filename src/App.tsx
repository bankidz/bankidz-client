import { Route, Routes, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import Layout from './components/layout/Layout';
import RequireAuth from '@components/auth/RequireAuth';
import PersistLogin from '@components/auth/PersistLogin';
import OnBoardingRouter from './pages/OnBoarding';
import HomeRouter from './pages/Home';
import WalkRouter from './pages/Walk';
import MypageRouter from './pages/Mypage';
import GroupLink from './components/mypage/GroupLink';
import InterestRouter from './pages/Interest';
import NotFound from './pages/NotFound';
import TestPage from './pages/Test/TestPage';
import '@components/layout/transition.css';
import RouteChangeTracker from '@components/auth/RouteChangeTracker';
import useAPIError from '@lib/hooks/errorHandler/useAPIError';
import ServiceRouter from './pages/ServiceRouter';

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
