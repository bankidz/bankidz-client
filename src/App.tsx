import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import OnBoardingRouter from './pages/OnBoarding';
import HomeRouter from './pages/Home';
import WalkRouter from './pages/Walk';
import MypageRouter from './pages/Mypage';
import FinancialRouter from './pages/Financial';
import NotFound from './pages/NotFound';
import RequireAuth from '@components/auth/RequireAuth';
import PersistLogin from '@components/auth/PersistLogin';
import TestPage from './pages/Test/TestPage';
import { useQueryClient } from 'react-query';
import GroupLink from './components/mypage/GroupLink';
import ManageRouter from './pages/Manage';

function App() {
  const queryClient = useQueryClient();
  queryClient.setDefaultOptions({
    queries: {
      refetchInterval: 0,
      retry: 0,
      refetchOnWindowFocus: false,
      onError: (error: any) => {},
    },
    mutations: {
      onError: (error: any) => {},
    },
  });

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/auth/*" element={<OnBoardingRouter />} />
        <Route path="/link/:groupCode" element={<GroupLink />} />
<<<<<<< HEAD
        {/* <Route element={<PersistLogin />}> */}
        <Route element={<RequireAuth />}>
          <Route path="/*" element={<HomeRouter />} />
          <Route path="/walk/*" element={<WalkRouter />} />
          <Route path="/mypage/*" element={<MypageRouter />} />
          <Route path="/manage/*" element={<ManageRouter />} />
          <Route path="/financial/*" element={<FinancialRouter />} />
          <Route path="/test/*" element={<TestPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* </Route> */}
=======
        <Route path="/test/*" element={<TestPage />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/*" element={<HomeRouter />} />
            <Route path="/walk/*" element={<WalkRouter />} />
            <Route path="/mypage/*" element={<MypageRouter />} />
            <Route path="/setting/*" element={<SettingRouter />} />
            <Route path="/financial/*" element={<FinancialRouter />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
>>>>>>> main
      </Route>
    </Routes>
  );
}

export default App;
