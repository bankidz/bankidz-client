import { Route, Routes } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import Layout from './components/layout/Layout';
import RequireAuth from '@components/auth/RequireAuth';
import PersistLogin from '@components/auth/PersistLogin';
import OnBoardingRouter from './pages/OnBoarding';
import HomeRouter from './pages/Home';
import WalkRouter from './pages/Walk';
import MypageRouter from './pages/Mypage';
import GroupLink from './components/mypage/GroupLink';
import ManageRouter from './pages/Manage';
import InterestRouter from './pages/Interest';
import NotFound from './pages/NotFound';
import TestPage from './pages/Test/TestPage';
import RouteChangeTracker from '@components/auth/RouteChangeTracker';
import useAPIError from '@lib/hooks/errorHandler/useAPIError';

function App() {
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
    <Routes>
      <Route element={<Layout />}>
        <Route path="/auth/*" element={<OnBoardingRouter />} />
        <Route path="/link/:groupCode" element={<GroupLink />} />
        <Route path="/test/*" element={<TestPage />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/*" element={<HomeRouter />} />
            <Route path="/walk/*" element={<WalkRouter />} />
            <Route path="/mypage/*" element={<MypageRouter />} />
            <Route path="/manage/*" element={<ManageRouter />} />
            <Route path="/interest/*" element={<InterestRouter />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
