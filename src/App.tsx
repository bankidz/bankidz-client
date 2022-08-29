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
import SungwooTestPage from './pages/SungwooTestPage';
import { useQueryClient } from 'react-query';
import GroupLink from './pages/GroupLink';

function App() {
  /* useEffect(() => {
    const setScreenSize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setScreenSize();
    window.addEventListener('resize', setScreenSize);
    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []); */

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
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/*" element={<HomeRouter />} />
            <Route path="/walk/*" element={<WalkRouter />} />
            <Route path="/mypage/*" element={<MypageRouter />} />
            <Route path="/financial/*" element={<FinancialRouter />} />
            {/* <Route path="/sungwoo" element={<SungwooTestPage />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>

        <Route path="/link/:groupCode" element={<GroupLink />} />
      </Route>
    </Routes>
  );
}

export default App;
